import {render} from '@solidjs/web';
// Terminal-copied upstream NavigationTree.mdx, render example 4.
import {NavigationTree, NavigationTreeItem, NavigationTreeItemContent, NavigationTreeItemLink, NavigationTreeSection, NavigationTreeHeader} from './native/vanilla/solid-NavigationTree';
import {Router, Link as RouterLink} from './solid-Router';

export default function Demo(props: Record<string, unknown> = {}) { return (<Router defaultSelectedRoute="/projects/apollo">
  {route => (
    <NavigationTree aria-label="Workspace" selectedRoute={route.selectedRoute} renderLink={props => <RouterLink {...props} />}>
      {/*- begin highlight -*/}
      <NavigationTreeSection>
        <NavigationTreeHeader>Personal</NavigationTreeHeader>
        <NavigationTreeItem href="/home" textValue="Home">
          <NavigationTreeItemContent>
            <NavigationTreeItemLink>Home</NavigationTreeItemLink>
          </NavigationTreeItemContent>
        </NavigationTreeItem>
        <NavigationTreeItem href="/starred" textValue="Starred">
          <NavigationTreeItemContent>
            <NavigationTreeItemLink>Starred</NavigationTreeItemLink>
          </NavigationTreeItemContent>
        </NavigationTreeItem>
      </NavigationTreeSection>
      {/*- end highlight -*/}
      <NavigationTreeSection>
        <NavigationTreeHeader>Projects</NavigationTreeHeader>
        <NavigationTreeItem href="/projects/apollo" textValue="Apollo">
          <NavigationTreeItemContent>
            <NavigationTreeItemLink>Apollo</NavigationTreeItemLink>
          </NavigationTreeItemContent>
        </NavigationTreeItem>
        <NavigationTreeItem href="/projects/gemini" textValue="Gemini">
          <NavigationTreeItemContent>
            <NavigationTreeItemLink>Gemini</NavigationTreeItemLink>
          </NavigationTreeItemContent>
        </NavigationTreeItem>
      </NavigationTreeSection>
    </NavigationTree>
  )}
</Router>); }


export const title = 'NavigationTree: upstream example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...{}} {...props} />, element); }
