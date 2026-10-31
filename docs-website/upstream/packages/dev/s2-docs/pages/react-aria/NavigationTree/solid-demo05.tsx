import {render} from '@solidjs/web';
// Terminal-copied upstream NavigationTree.mdx, render example 5.
import {NavigationTree, NavigationTreeItem, NavigationTreeItemContent, NavigationTreeItemLink} from './native/vanilla/solid-NavigationTree';
import {Router, Link as RouterLink} from './solid-Router';

export default function Demo(props: Record<string, unknown> = {}) { return (<Router defaultSelectedRoute="/inbox">
  {route => (
    /*- begin highlight -*/
    <NavigationTree aria-label="Mail" selectedRoute={route.selectedRoute} renderLink={props => <RouterLink {...props} />}>
      {/*- end highlight -*/}
      <NavigationTreeItem href="/inbox" textValue="Inbox">
        <NavigationTreeItemContent>
          <NavigationTreeItemLink>Inbox</NavigationTreeItemLink>
        </NavigationTreeItemContent>
      </NavigationTreeItem>
      <NavigationTreeItem href="/drafts" textValue="Drafts">
        <NavigationTreeItemContent>
          <NavigationTreeItemLink>Drafts</NavigationTreeItemLink>
        </NavigationTreeItemContent>
      </NavigationTreeItem>
      <NavigationTreeItem href="/sent" textValue="Sent">
        <NavigationTreeItemContent>
          <NavigationTreeItemLink>Sent</NavigationTreeItemLink>
        </NavigationTreeItemContent>
      </NavigationTreeItem>
    </NavigationTree>
  )}
</Router>); }


export const title = 'NavigationTree: upstream example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...{}} {...props} />, element); }
