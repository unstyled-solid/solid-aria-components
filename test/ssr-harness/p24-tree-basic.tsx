// Frozen Tree.ssr.test.js's full physical Test and content fixture.
import {createSignal} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {Button} from '../../packages/react-aria-components/src/Button';
import {Tree, TreeItem, TreeItemContent} from '../../packages/react-aria-components/src/Tree';

function MyTreeItemContent(props: {children?: JSX.Element}) {
  return (
    <TreeItemContent>
      {values => (
        <>
          <Button slot="chevron" style={{visibility: values.hasChildItems ? 'visible' : 'hidden'}}>
            <svg viewBox="0 0 24 24">
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Button>
          {props.children}
        </>
      )}
    </TreeItemContent>
  );
}

export function Fixture() {
  let [show, setShow] = createSignal(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Show</button>
      <Tree aria-label="Files" style={{height: '300px'}} defaultExpandedKeys={['documents', 'photos', 'project']}>
        <TreeItem id="documents" textValue="Documents">
          <MyTreeItemContent>Documents</MyTreeItemContent>
          <TreeItem id="project" textValue="Project">
            <MyTreeItemContent>Project</MyTreeItemContent>
            {show() && <TreeItem id="report" textValue="Weekly Report">
              <MyTreeItemContent>Weekly Report</MyTreeItemContent>
            </TreeItem>}
          </TreeItem>
        </TreeItem>
        <TreeItem id="photos" textValue="Photos">
          <MyTreeItemContent>Photos</MyTreeItemContent>
          <TreeItem id="one" textValue="Image 1">
            <MyTreeItemContent>Image 1</MyTreeItemContent>
          </TreeItem>
          <TreeItem id="two" textValue="Image 2">
            <MyTreeItemContent>Image 2</MyTreeItemContent>
          </TreeItem>
        </TreeItem>
      </Tree>
    </>
  );
}
