// Native integration of Storybook 10.3.5's actual portable-story composition.
// Core owns argument/parameter merging, decorators, hooks and lifecycle methods.
import {createComponent, type JSX} from '@solidjs/web';
import {composeStories as coreComposeStories, composeStory as coreComposeStory} from 'storybook/internal/preview-api';
import type {
  Args, ComponentAnnotations, ComposeStoryFn, ProjectAnnotations, Renderer,
  Store_CSFExports, StoriesWithPartialProps, StoryContext
} from 'storybook/internal/types';

export interface NativeRenderer extends Renderer {
  component: (props: this['T']) => JSX.Element;
  storyResult: JSX.Element;
  canvasElement: HTMLElement;
}

const nativeDefaults: ProjectAnnotations<NativeRenderer> = {
  render: (args, context) => {
    if (!context.component) throw new Error('Native portable story requires a component or an explicit render function.');
    return createComponent(context.component, args);
  }
};

const nativeComposeStory: ComposeStoryFn<NativeRenderer> = (story, meta, project, exportsName) =>
  coreComposeStory<NativeRenderer>(story, meta, project, nativeDefaults, exportsName);

type ModuleArgs<TModule extends {default: unknown}> =
  TModule['default'] extends ComponentAnnotations<infer _Renderer, infer TArgs>
    ? TArgs extends Args ? TArgs : never
    : never;
type NativeProject<TArgs extends Args> = Omit<ProjectAnnotations<NativeRenderer>, 'render'> & {
  render?: (args: TArgs, context: StoryContext<NativeRenderer, TArgs> & {
    component: (props: TArgs) => JSX.Element
  }) => JSX.Element;
};

export function composeStories<TModule extends {default: unknown}>(
  stories: TModule & {default: ComponentAnnotations<NativeRenderer, ModuleArgs<TModule>>},
  projectAnnotations: NativeProject<ModuleArgs<TModule>> = {}
): StoriesWithPartialProps<NativeRenderer, TModule> {
  if (projectAnnotations.render && typeof stories.default.component !== 'function') {
    throw new Error('Native project fallback rendering requires a callable metadata component.');
  }
  // The neutral declaration erases the renderer and returns {}. These localized
  // bridges restore the native renderer and core's genuine mapped result type;
  // no metadata or result methods are reconstructed here.
  return coreComposeStories(
    stories as unknown as Store_CSFExports,
    projectAnnotations as unknown as ProjectAnnotations<Renderer>,
    nativeComposeStory as unknown as ComposeStoryFn
  ) as StoriesWithPartialProps<NativeRenderer, TModule>;
}
