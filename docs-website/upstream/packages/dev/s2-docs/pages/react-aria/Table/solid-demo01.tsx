import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 1; source content and algorithms retained.
  import {Table, TableHeader, Column, Row, TableBody, Cell} from '../ListBox/native/vanilla/solid-Table';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<Table{...props}>
    <TableHeader>
      <Column id="name" isRowHeader>Name</Column>
      <Column id="type">Type</Column>
      <Column id="date">Date Modified</Column>
    </TableHeader>
    <TableBody>
      <Row id="games">
        <Cell>Games</Cell>
        <Cell>Folder</Cell>
        <Cell>6/7/2023</Cell>
        <Row id="mario">
          <Cell>Mario Kart</Cell>
          <Cell>Game</Cell>
          <Cell>8/27/1992</Cell>
        </Row>
        <Row id="tetris">
          <Cell>Tetris</Cell>
          <Cell>Game</Cell>
          <Cell>1/27/1988</Cell>
        </Row>
        <Row id="pacman">
          <Cell>Pac-Man</Cell>
          <Cell>Game</Cell>
          <Cell>5/22/1980</Cell>
        </Row>
      </Row>
      <Row id="apps">
        <Cell>Applications</Cell>
        <Cell>Folder</Cell>
        <Cell>4/7/2025</Cell>
        <Row id="ps">
          <Cell>Photoshop</Cell>
          <Cell>Application</Cell>
          <Cell>2/19/1990</Cell>
        </Row>
        <Row id="premiere">
          <Cell>Premiere</Cell>
          <Cell>Application</Cell>
          <Cell>9/24/2003</Cell>
        </Row>
        <Row id="lightroom">
          <Cell>Lightroom</Cell>
          <Cell>Application</Cell>
          <Cell>10/18/2017</Cell>
        </Row>
      </Row>
      <Row id="report">
        <Cell>2024 Financial Report</Cell>
        <Cell>PDF Document</Cell>
        <Cell>12/30/2024</Cell>
      </Row>
      <Row id="job">
        <Cell>Job Posting</Cell>
        <Cell>Text Document</Cell>
        <Cell>1/18/2025</Cell>
      </Row>
    </TableBody>
  </Table>);
}


export const title = "Table: upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{'aria-label': 'Files', selectionMode: 'multiple', 'treeColumn': 'name'}} {...props} />, element);
}
