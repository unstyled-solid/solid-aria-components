import {Heading as AriaHeading, type HeadingProps} from 'solid-aria-components/Heading';
import {Text as AriaText, type TextProps} from 'solid-aria-components/Text';
import './Content.css';

export function Heading(props: HeadingProps) {
  return <AriaHeading {...props} />;
}

export function Text(props: TextProps) {
  return <AriaText {...props} />;
}
