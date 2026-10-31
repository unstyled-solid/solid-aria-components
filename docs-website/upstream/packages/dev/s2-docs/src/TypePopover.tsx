'use client';

import {Breadcrumb, Breadcrumbs, Popover} from '@react-spectrum/s2';
import {DialogTrigger} from 'react-aria-components/Dialog';
import {ColorLink} from './Link';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};

interface TypeLinkContextValue {
  push(name: string, children: ReactNode): void;
}

const TypeLinkContext = createContext<TypeLinkContextValue | null>(null);

/**
 * Displays a link with a popover to browse a TypeScript type definition.
 */
export function TypePopover({name, children}: {name: string; children: ReactNode}) {
  let [breadcrumbs, setBreadcrumbs] = useState([{id: 0, name, children}]);
  let ctx = useContext(TypeLinkContext);

  // If already inside a parent TypeLink, push onto the stack within the same popover.
  if (ctx) {
    return <ColorLink onPress={() => ctx.push(name, children)}>{name}</ColorLink>;
  }

  // Otherwise render the root popover with breadcrumbs for the stack of visited links.
  let cur = breadcrumbs.at(-1)!;
  let push = (name: string, children: ReactNode) => {
    setBreadcrumbs(breadcrumbs => [...breadcrumbs, {id: breadcrumbs.length, name, children}]);
  };

  // ColorLink is a React Aria link, not a Spectrum press-scaled button.
  // Use its matching trigger contract; Spectrum's extra PressResponder only
  // overrides button scaling and belongs to a separate private interactions copy.
  return (
    <DialogTrigger>
      <ColorLink className={style({color: 'red-1000'})}>{name}</ColorLink>
      <Popover styles={style({maxWidth: 600})}>
        <div className={style({padding: 12})}>
          <Breadcrumbs
            size="L"
            onAction={id => setBreadcrumbs(breadcrumbs.slice(0, Number(id) + 1))}
            styles={style({marginBottom: 16})}>
            {breadcrumbs.map(item => (
              <Breadcrumb key={item.id} id={item.id}>
                {item.name}
              </Breadcrumb>
            ))}
          </Breadcrumbs>
          <TypeLinkContext.Provider value={{push}}>{cur.children}</TypeLinkContext.Provider>
        </div>
      </Popover>
    </DialogTrigger>
  );
}
