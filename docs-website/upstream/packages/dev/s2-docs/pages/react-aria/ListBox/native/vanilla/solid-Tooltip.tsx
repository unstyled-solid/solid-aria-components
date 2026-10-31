import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {
  OverlayArrow,
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  TooltipTrigger as AriaTooltipTrigger,
  type TooltipTriggerComponentProps
} from 'solid-aria-components/Tooltip';
import './Tooltip.css';

export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
  children: JSX.Element;
}

export function Tooltip(inputProps: TooltipProps) {
  let props = omit(inputProps, "children");
  return (
    <AriaTooltip {...props}>
      <OverlayArrow>
        <svg width={8} height={8} viewBox="0 0 8 8">
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {inputProps.children}
    </AriaTooltip>
  );
}

export function TooltipTrigger(props: TooltipTriggerComponentProps) {
  return <AriaTooltipTrigger {...props} />;
}
