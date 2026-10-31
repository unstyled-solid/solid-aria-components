import {Toolbar as RACToolbar, type ToolbarProps} from 'solid-aria-components/Toolbar';
import {ToggleButtonGroupContext} from 'solid-aria-components/ToggleButtonGroup';
import {composeRenderProps} from 'solid-aria-components/composeRenderProps';
import {tv} from 'tailwind-variants';

const styles = tv({
  base: 'flex flex-wrap gap-2',
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col items-start'
    }
  }
});

export function Toolbar(props: ToolbarProps) {
  return (
    <ToggleButtonGroupContext value={{get orientation() { return props.orientation; }}}>
      <RACToolbar
        {...props}
        className={composeRenderProps(props.className, (className, renderProps) =>
          styles({...renderProps, className})
        )}
      />
    </ToggleButtonGroupContext>
  );
}
