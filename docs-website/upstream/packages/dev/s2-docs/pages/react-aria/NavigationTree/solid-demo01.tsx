import {render} from '@solidjs/web';
// Terminal-copied upstream NavigationTree.mdx, render example 1.
  import {NavigationTree, NavigationTreeItem, NavigationTreeItemContent, NavigationTreeItemLink} from './native/vanilla/solid-NavigationTree';
  import {Button} from '../ListBox/native/vanilla/solid-Button';
  import {MoreHorizontal} from '../ListBox/native-icons/solid-icons';
  import {Router, Link as RouterLink} from './solid-Router';

  export default function Demo(props: Record<string, unknown> = {}) { return (<Router defaultSelectedRoute="/photos">
    {route => (
      <NavigationTree aria-label="Files" selectedRoute={route.selectedRoute} renderLink={props => <RouterLink {...props} />} defaultExpandedKeys={['files']}>
        <NavigationTreeItem id="home" href="/home" textValue="Home">
          <NavigationTreeItemContent>
            <NavigationTreeItemLink>Home</NavigationTreeItemLink>
            <Button variant="quiet" aria-label="More options"><MoreHorizontal size={16} aria-hidden="true" /></Button>
          </NavigationTreeItemContent>
        </NavigationTreeItem>
        <NavigationTreeItem id="files" href="/files" textValue="Files">
          <NavigationTreeItemContent>
            <NavigationTreeItemLink>Files</NavigationTreeItemLink>
            <Button variant="quiet" aria-label="More options"><MoreHorizontal size={16} aria-hidden="true" /></Button>
          </NavigationTreeItemContent>
          <NavigationTreeItem id="photos" href="/photos" textValue="Photos">
            <NavigationTreeItemContent>
              <NavigationTreeItemLink>Photos</NavigationTreeItemLink>
              <Button variant="quiet" aria-label="More options"><MoreHorizontal size={16} aria-hidden="true" /></Button>
            </NavigationTreeItemContent>
          </NavigationTreeItem>
          <NavigationTreeItem id="videos" href="/videos" textValue="Videos">
            <NavigationTreeItemContent>
              <NavigationTreeItemLink>Videos</NavigationTreeItemLink>
              <Button variant="quiet" aria-label="More options"><MoreHorizontal size={16} aria-hidden="true" /></Button>
            </NavigationTreeItemContent>
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem id="shared" textValue="Shared">
          <NavigationTreeItemContent>
            <NavigationTreeItemLink>Shared</NavigationTreeItemLink>
            <Button variant="quiet" aria-label="More options"><MoreHorizontal size={16} aria-hidden="true" /></Button>
          </NavigationTreeItemContent>
          <NavigationTreeItem id="food" href="/food" textValue="Food">
            <NavigationTreeItemContent>
              <NavigationTreeItemLink>Food</NavigationTreeItemLink>
              <Button variant="quiet" aria-label="More options"><MoreHorizontal size={16} aria-hidden="true" /></Button>
            </NavigationTreeItemContent>
          </NavigationTreeItem>
          <NavigationTreeItem id="drinks" href="/drinks" textValue="Drinks">
            <NavigationTreeItemContent>
              <NavigationTreeItemLink>Drinks</NavigationTreeItemLink>
              <Button variant="quiet" aria-label="More options"><MoreHorizontal size={16} aria-hidden="true" /></Button>
            </NavigationTreeItemContent>
          </NavigationTreeItem>
        </NavigationTreeItem>
      </NavigationTree>
    )}
  </Router>); }


export const title = 'NavigationTree: upstream example 1';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...{}} {...props} />, element); }
