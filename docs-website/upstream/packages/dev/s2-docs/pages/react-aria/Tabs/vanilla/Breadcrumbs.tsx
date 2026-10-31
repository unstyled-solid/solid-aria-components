import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  Breadcrumbs as RACBreadcrumbs,
  type BreadcrumbsProps,
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps,
  type LinkProps,
  Link } from
'solid-aria-components';
import { ChevronRight } from '../icons';
import './Breadcrumbs.css';

export function Breadcrumbs<T>(props: BreadcrumbsProps<T>) {
  return <RACBreadcrumbs {...props} />;
}

export function Breadcrumb(props: BreadcrumbProps & Omit<LinkProps, 'className'>) {
  return (
    <RACBreadcrumb {...props}>
      {(_props) =>
      <>
          <Link {...props} />
          {!_props.isCurrent && <ChevronRight size={14} />}
        </>
      }
    </RACBreadcrumb>);

}
