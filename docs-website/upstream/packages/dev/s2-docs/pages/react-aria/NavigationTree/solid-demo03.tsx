import {render} from '@solidjs/web';
// Terminal-copied upstream NavigationTree.mdx, render example 3.
import {NavigationTree, NavigationTreeItem, NavigationTreeItemContent, NavigationTreeItemLink} from './native/vanilla/solid-NavigationTree';
import {Router, Link as RouterLink} from './solid-Router';

function Example() {
  let items = [
    {id: 'overview', url: '/overview', label: 'Overview'},
    {id: 'reports', url: '/reports', label: 'Reports'},
    {id: 'settings', url: '/settings', label: 'Settings'}
  ];

  return (
    <Router defaultSelectedRoute="/reports">
      {route => (
        /*- begin highlight -*/
        <NavigationTree aria-label="Sections" items={items} selectedRoute={route.selectedRoute} renderLink={props => <RouterLink {...props} />}>
          {item => (
            <NavigationTreeItem href={item.url} textValue={item.label}>
              <NavigationTreeItemContent>
                <NavigationTreeItemLink>{item.label}</NavigationTreeItemLink>
              </NavigationTreeItemContent>
            </NavigationTreeItem>
          )}
        </NavigationTree>
        /*- end highlight -*/
      )}
    </Router>
  );
}

const Demo = Example;
export default Demo;

export const title = 'NavigationTree: upstream example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...{}} {...props} />, element); }
