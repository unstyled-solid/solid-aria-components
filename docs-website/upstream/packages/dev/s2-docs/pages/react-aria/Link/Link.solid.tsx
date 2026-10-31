'use client';
import {Link as NativeLink, type LinkProps} from 'solid-aria-components';
import './Link.css';

export function Link(props: LinkProps) {
  return <NativeLink {...props} className="react-aria-Link" />;
}
