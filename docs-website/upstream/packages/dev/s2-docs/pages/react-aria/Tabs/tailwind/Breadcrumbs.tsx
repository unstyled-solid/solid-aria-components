import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { ChevronRight } from '../icons';
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  type BreadcrumbProps,
  type BreadcrumbsProps,
  type LinkProps } from
'solid-aria-components';
import { twMerge } from 'tailwind-merge';
import { Link } from './Link';
import { composeTailwindRenderProps } from './utils';

export function Breadcrumbs<T>(props: BreadcrumbsProps<T>) {
  return <AriaBreadcrumbs {...props} className={twMerge('flex gap-1', props.className)} />;
}

export function Breadcrumb(props: BreadcrumbProps & Omit<LinkProps, 'className'>) {
  return (
    <AriaBreadcrumb
      {...props}
      className={composeTailwindRenderProps(props.className, 'flex items-center gap-1')}>
      {(_props) =>
      <>
          <Link variant="secondary" {...props} />
          {!_props.isCurrent &&
        <ChevronRight className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
        }
        </>
      }
    </AriaBreadcrumb>);

}
