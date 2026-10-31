// Native structural metadata contract from the copied Page consumers.
// This describes actual MDX data, not React/Parcel transport or a runnable page.
export type MetadataValue = string | number | boolean | null | MetadataValue[] | {[key: string]: MetadataValue};
export interface TocNode {
  title: string;
  level: number;
  children: TocNode[];
  id: string;
}
export interface PageExports {
  [key: string]: MetadataValue | undefined;
  title?: string;
  description?: string;
  tags?: string[];
  relatedPages?: {title: string; url: string}[];
  version?: string;
  section?: string;
  group?: string;
  hideNav?: boolean;
  omitFromNav?: boolean;
  isSubpage?: boolean;
}
export interface PageMetadata {
  name: string;
  exports: PageExports;
  tableOfContents: TocNode[];
}
export interface Page {
  name: string;
  url: string;
  exports?: PageExports;
  tableOfContents?: TocNode[];
}
