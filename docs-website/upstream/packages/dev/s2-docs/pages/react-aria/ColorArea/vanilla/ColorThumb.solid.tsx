import {ColorThumb as AriaColorThumb, type ColorThumbProps} from 'solid-aria-components';
import './ColorThumb.css';

export function ColorThumb(props: ColorThumbProps) {
  return <AriaColorThumb {...props} />;
}
