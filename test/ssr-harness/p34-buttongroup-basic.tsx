import {ButtonGroup} from '../../packages/@adobe/react-spectrum/src/buttongroup/ButtonGroup';
import {Button} from '../../packages/@adobe/react-spectrum/src/button/Button';
import {Provider} from '../../packages/@adobe/react-spectrum/src/provider/Provider';
import {defaultTheme as theme} from '../../packages/@adobe/react-spectrum/src/theme-default/defaultTheme';

export function Fixture() {
  return <Provider theme={theme}>
    <ButtonGroup>
      <Button variant="primary">Test</Button>
    </ButtonGroup>
  </Provider>;
}
