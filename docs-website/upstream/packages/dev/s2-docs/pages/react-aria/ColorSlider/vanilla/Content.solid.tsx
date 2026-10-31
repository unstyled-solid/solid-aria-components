import {Heading as AriaHeading, type HeadingProps} from 'solid-aria-components';
import {Text as AriaText, type TextProps} from 'solid-aria-components';
import './Content.css';

export function Heading(props: HeadingProps) {
  return <AriaHeading {...props} />;
}

export function Text(props: TextProps) {
  return <AriaText {...props} />;
}
