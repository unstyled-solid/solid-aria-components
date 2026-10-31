import {Toolbar as RACToolbar, type ToolbarProps} from 'solid-aria-components/Toolbar';
import {SeparatorContext} from 'solid-aria-components/Separator';
import {ToggleButtonGroupContext} from 'solid-aria-components/ToggleButtonGroup';
import './Toolbar.css';

export function Toolbar(props: ToolbarProps) {
  let orientation = () => props.orientation ?? 'horizontal';
  return (
    <ToggleButtonGroupContext value={{get orientation() { return orientation(); }}}>
      <SeparatorContext
        value={{get orientation() { return orientation() === 'horizontal' ? 'vertical' : 'horizontal'; }}}>
        <RACToolbar {...props} />
      </SeparatorContext>
    </ToggleButtonGroupContext>
  );
}
