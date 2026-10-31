import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { PreviewTrigger } from "solid-aria-components/PreviewTrigger";
import { Popover } from "../ListBox/native/tailwind/solid-Popover";
import { Link } from "../Link/tailwind/Link.solid";
import { Button } from "../Button/tailwind/Button.solid";
function ProfilePreview(popoverProps) {
  return <PreviewTrigger>
        <Link href={popoverProps.href}>@{popoverProps.handle}</Link>
        <Popover className="w-[280px] p-2" {...popoverProps}>
          <div className="flex gap-2 items-center">
            <img alt="" src={popoverProps.avatar} className="size-10 rounded-full shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-semibold">{popoverProps.name}</div>
              <div className="text-xs">@{popoverProps.handle}</div>
            </div>
            <Button className="ml-auto" variant="secondary" onPress={() => alert(`Followed @${popoverProps.handle}`)}>Follow</Button>
          </div>
          <div className="text-sm mt-3">{popoverProps.bio}</div>
        </Popover>
      </PreviewTrigger>;
}
function Example(props) {
  return <p className="max-w-[480px]">
        {'Just shipped a new release with help from '}
        <ProfilePreview handle="mayachen" name="Maya Chen" bio="UI engineer, accessibility advocate, and component library enthusiast." avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" href="#" {...props} />
        {' and '}
        <ProfilePreview handle="cwebb" name="Charles Webb" bio="Design systems, docs, and developer experience." avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" href="#" {...props} />
        !
      </p>;
}

export const title = "PreviewTrigger upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
