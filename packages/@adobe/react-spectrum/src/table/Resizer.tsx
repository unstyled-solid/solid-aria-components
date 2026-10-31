import {classNames} from '../utils/classNames';
import {ColumnSize, TableColumnResizeState} from 'react-stately/useTableState';
import eCursor from 'bundle-text:./cursors/Cur_MoveToRight_9_9.svg';
import ewCursor from 'bundle-text:./cursors/Cur_MoveHorizontal_9_9.svg';
import {FocusRing} from 'react-aria/FocusRing';
import {GridNode} from 'react-stately/private/grid/GridCollection';
import intlMessages from '../../intl/table/*.json';
import {isWebKit} from 'react-aria/private/utils/platform';
import {Key, RefObject} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, useContext} from 'solid-js';
import {Portal, type JSX} from '@solidjs/web';
import type {Ref} from 'react-aria/private/utils/useObjectRef';
import styles from '@adobe/spectrum-css-temp/components/table/vars.css';
import {useLocale} from 'react-aria/I18nProvider';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useTableColumnResize} from 'react-aria/useTable';
import {useTableContext, useVirtualizerContext} from './TableViewBase';
import {useUNSAFE_PortalContext} from 'react-aria/PortalProvider';
// @ts-ignore
import wCursor from 'bundle-text:./cursors/Cur_MoveToLeft_9_9.svg';

function getCursor(svg: string, fallback: string) {
  // WebKit renders SVG cursors blurry on 2x screens: https://bugs.webkit.org/show_bug.cgi?id=160657
  // To work around this, we generate two SVGs at different sizes and use image-set to pick between them.
  // Only do this in WebKit to avoid Firefox rendering the cursor at twice the size.
  if (isWebKit()) {
    return `image-set(url("data:image/svg+xml,${encodeURIComponent(svg)}") 1x, url("data:image/svg+xml,${encodeURIComponent(svg.replace('width="32" height="32"', 'width="64" height="64"'))}") 2x) 8 8, ${fallback}`;
  } else {
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 8 8, ${fallback}`;
  }
}

interface ResizerProps<T> {
  column: GridNode<T>;
  showResizer: boolean;
  triggerRef: RefObject<HTMLDivElement | null>;
  onResizeStart?: (widths: Map<Key, ColumnSize>) => void;
  onResize?: (widths: Map<Key, ColumnSize>) => void;
  onResizeEnd?: (widths: Map<Key, ColumnSize>) => void;
  ref?: Ref<HTMLInputElement>;
}

const CURSORS = {
  ew: getCursor(ewCursor, 'ew-resize'),
  w: getCursor(wCursor, 'w-resize'),
  e: getCursor(eCursor, 'e-resize')
};

export const ResizeStateContext = createContext<TableColumnResizeState<unknown> | null>(null);

export function Resizer<T>(props: ResizerProps<T>) {
  let objectRef = useObjectRef(props.ref);
  let table = useTableContext();
  let layout = useContext(ResizeStateContext)!;
  // Virtualizer re-renders, but these components are all cached
  // in order to get around that and cause a rerender here, we use context
  // but we don't actually need any value, they are available on the layout object
  useVirtualizerContext();
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/table');
  let locale = useLocale();

  let {inputProps, resizerProps, isMouseResizing} = useTableColumnResize<unknown>(
    mergeProps(props, {
      get 'aria-label'() {return stringFormatter.format('columnResizer');},
      get isDisabled() {return table.isEmpty;}
    }),
    layout,
    objectRef
  );

  let isEResizable = () => layout.getColumnMinWidth(props.column.key) >= layout.getColumnWidth(props.column.key);
  let isWResizable = () => layout.getColumnMaxWidth(props.column.key) <= layout.getColumnWidth(props.column.key);
  let isResizing = () => layout.resizingColumn === props.column.key;
  let cursor = () => isEResizable()
    ? locale.direction === 'rtl' ? CURSORS.w : CURSORS.e
    : isWResizable() ? locale.direction === 'rtl' ? CURSORS.e : CURSORS.w : CURSORS.ew;

  let style = merge(() => resizerProps.style ?? {}, {
    height: '100%',
    get display() {return props.showResizer ? undefined : 'none';},
    get cursor() {return cursor();}
  });

  return (
    <>
      <FocusRing within focusRingClass={classNames(styles, 'focus-ring')}>
        {compose => <div
          {...compose(merge(resizerProps, {
            role: 'presentation' as const,
            style,
            class: classNames(styles, 'spectrum-Table-columnResizer')
          })) as JSX.HTMLAttributes<HTMLDivElement>}>
          <input {...mergeProps(inputProps, {get onFocus() {return table.onFocusedResizer;}})} ref={objectRef} />
        </div>}
      </FocusRing>
      {/* Placeholder so that the title doesn't intersect with space reserved by the resizer when it appears. */}
      <div
        aria-hidden="true"
        role="presentation"
        class={classNames(styles, 'spectrum-Table-columnResizerPlaceholder')}
      />
      <CursorOverlay show={isResizing() && isMouseResizing()}>
        <div style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, get cursor() {return cursor();}}} />
      </CursorOverlay>
    </>
  );
}

function CursorOverlay(props: {show: boolean; children: JSX.Element}) {
  let portal = useUNSAFE_PortalContext();
  return <>{props.show ? <Portal mount={portal.getContainer?.() ?? document.body}>{props.children}</Portal> : null}</>;
}
