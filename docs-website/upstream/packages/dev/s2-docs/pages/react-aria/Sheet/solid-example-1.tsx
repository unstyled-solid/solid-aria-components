import { render } from '@solidjs/web';
import { createSignal, For, Show, omit, flush } from 'solid-js';
import type { JSX } from '@solidjs/web';
"use client";
import { SheetTrigger } from "solid-aria-components/Sheet";
import { Sheet, Heading } from "./vanilla/solid-Sheet";
import { Button } from "../Button/vanilla/Button.solid";
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
          <div style={{
        "display": 'flex',
        "flex-direction": 'column',
        "min-height": '100%'
      }}>
            <Heading slot="title">Your order</Heading>
            <p style={{
          "margin": '0 0 20px',
          "color": 'var(--gray-1000)'
        }}>Delivering from Bao Bros · 25–35 min</p>
            <div style={{
          "display": 'flex',
          "flex-direction": 'column',
          "gap": 'var(--spacing-4)',
          "flex-grow": 1
        }}>
              <For each={items()} keyed={item => item.name}>{item => <div key={item().name} style={{
              "display": 'flex',
              "align-items": 'center',
              "gap": 'var(--spacing-3)'
            }}>
                  <span style={{
                "width": 'calc(15 * var(--spacing))',
                "height": 'calc(15 * var(--spacing))',
                "border-radius": "12px",
                "background": 'var(--gray-200)',
                "font-size": "28px",
                "display": 'flex',
                "align-items": 'center',
                "justify-content": 'center',
                "flex-shrink": 0
              }}>{item().emoji}</span>
                  <div style={{
                "display": 'flex',
                "align-items": 'center',
                "column-gap": 'var(--spacing-3)',
                "row-gap": "4px",
                "flex-wrap": 'wrap',
                "flex-grow": 1
              }}>
                    <div style={{
                  "flex-grow": 100,
                  "min-width": "0px"
                }}>
                      <div style={{
                    "font-weight": 600
                  }}>{item().name}</div>
                      <div style={{
                    "font-size": "12px",
                    "color": 'var(--gray-1000)'
                  }}>{item().detail}</div>
                    </div>
                    <div style={{
                  "display": 'flex',
                  "align-items": 'center',
                  "gap": "4px",
                  "flex-grow": 1
                }}>
                      <Button aria-label={`Remove one ${item().name}`} variant="secondary" onPress={() => update(item().name, -1)}><Minus size={16} /></Button>
                      <span style={{
                    "min-width": "20px",
                    "text-align": 'center'
                  }}>{item().qty}</span>
                      <Button aria-label={`Add one ${item().name}`} variant="secondary" onPress={() => update(item().name, 1)}><Plus size={16} /></Button>
                      <span style={{
                    "min-width": '6ch',
                    "text-align": 'end',
                    "flex-grow": 1
                  }}>${(item().price * item().qty).toFixed(2)}</span>
                    </div>
                  </div>
                </div>}</For>
            </div>
            <div style={{
          "display": 'flex',
          "flex-direction": 'column',
          "gap": "4px",
          "margin": '20px 0',
          "padding-top": "16px",
          "border-top": '1px solid var(--gray-300)'
        }}>
              <div style={{
            "display": 'flex',
            "justify-content": 'space-between'
          }}><span>Subtotal</span><span>${subtotal().toFixed(2)}</span></div>
              <div style={{
            "display": 'flex',
            "justify-content": 'space-between'
          }}><span>Delivery fee</span><span>${delivery().toFixed(2)}</span></div>
              <div style={{
            "display": 'flex',
            "justify-content": 'space-between',
            "font-weight": 600
          }}><span>Total</span><span>${(subtotal() + delivery()).toFixed(2)}</span></div>
            </div>
            <Button slot="close" style={{
          "width": '100%'
        }}>Place order</Button>
          </div>
          {/*- end collapse -*/}
        </Sheet>
      </SheetTrigger>;
}
export const title = "Sheet upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {
  return render(() => <Example {...props} />, element);
}
