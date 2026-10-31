import { render } from '@solidjs/web';
import { createSignal, For, Show, omit, flush } from 'solid-js';
import type { JSX } from '@solidjs/web';
"use client";
import { SheetTrigger } from "solid-aria-components/Sheet";
import { Sheet } from "./tailwind/solid-Sheet";
import { Heading } from "solid-aria-components/Dialog";
import { Button } from "../Button/tailwind/Button.solid";
import { Minus, Plus, ShoppingCart } from "./solid-icons";
function Example(props) {
  let [items, setItems] = createSignal([{
    name: 'Pork Bao',
    detail: 'Steamed · 2 pieces',
    emoji: '🥟',
    price: 4.5,
    qty: 2
  }, {
    name: 'Spicy Ramen',
    detail: 'Extra spicy · Soft egg',
    emoji: '🍜',
    price: 13,
    qty: 1
  }, {
    name: 'Mango Boba',
    detail: 'Less ice · 50% sweet',
    emoji: '🧋',
    price: 5.75,
    qty: 1
  }]);
  let update = (name, delta) => setItems(items => items.map(item => item.name === name ? {
    ...item,
    qty: item.qty + delta
  } : item).filter(item => item.qty > 0));
  let subtotal = () => items().reduce((sum, item) => sum + item.price * item.qty, 0);
  let delivery = () => items().length ? 2.99 : 0;
  return <SheetTrigger>
        <Button>
          <ShoppingCart size={18} />
          <span>Cart ({items().reduce((n, item) => n + item.qty, 0)})</span>
        </Button>
        {/*- begin highlight -*/}
        <Sheet {...props} /* PROPS */>
        {/*- end highlight -*/}
        {/*- begin collapse -*/}
          <div className="flex flex-col min-h-full">
            <Heading slot="title" className="text-xl font-semibold mt-0 mb-0.5">Your order</Heading>
            <p className="mt-0 mb-5 text-sm text-neutral-600 dark:text-neutral-400">Delivering from Bao Bros · 25–35 min</p>
            <div className="flex flex-col gap-4 flex-1">
              <For each={items()} keyed={item => item.name}>{item => <div key={item().name} className="flex items-center gap-3">
                  <span className="w-14 h-14 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-3xl flex items-center justify-center shrink-0">{item().emoji}</span>
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 grow">
                    <div className="grow-100 min-w-0">
                      <div className="text-sm font-semibold">{item().name}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">{item().detail}</div>
                    </div>
                    <div className="flex items-center gap-1 grow">
                      <Button aria-label={`Remove one ${item().name}`} variant="secondary" onPress={() => update(item().name, -1)}><Minus size={16} /></Button>
                      <span className="min-w-5 text-center">{item().qty}</span>
                      <Button aria-label={`Add one ${item().name}`} variant="secondary" onPress={() => update(item().name, 1)}><Plus size={16} /></Button>
                      <span className="min-w-[6ch] text-sm text-end grow">${(item().price * item().qty).toFixed(2)}</span>
                    </div>
                  </div>
                </div>}</For>
            </div>
            <div className="flex flex-col gap-1 my-5 pt-4 text-sm border-t border-neutral-300 dark:border-neutral-700">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal().toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery fee</span><span>${delivery().toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span>${(subtotal() + delivery()).toFixed(2)}</span></div>
            </div>
            <Button slot="close" className="w-full">Place order</Button>
          </div>
          {/*- end collapse -*/}
        </Sheet>
      </SheetTrigger>;
}
export const title = "Sheet upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {
  return render(() => <Example {...props} />, element);
}
