import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { SheetTrigger } from "solid-aria-components/Sheet";
import { Sheet, Heading } from "./vanilla/solid-Sheet";
import { Button } from "../Button/vanilla/Button.solid";
import { Star, MapPin, Clock, Phone } from "./solid-icons";
import { Map } from "./solid-Map";
let reviews = [{
  name: 'Maya R.',
  date: '2 days ago',
  text: 'The espresso was smooth and the staff was lovely. A great spot for a quiet morning.'
}, {
  name: 'Jordan K.',
  date: '1 week ago',
  text: 'Really good pour-over and plenty of seating. It gets busy around lunch, but the line moves quickly.'
}, {
  name: 'Avery L.',
  date: '2 weeks ago',
  text: 'The iced coffee was bright and refreshing, and the pastries were excellent. I will definitely be back.'
}, {
  name: 'Chris T.',
  date: '1 month ago',
  text: 'Beautiful space with consistently good coffee. The cappuccino had the perfect amount of foam.'
}, {
  name: 'Samira P.',
  date: '1 month ago',
  text: 'Friendly service, fast Wi-Fi, and a great neighborhood atmosphere. One of my favorite coffee shops in Port Marlow.'
}];
function Example() {
  return <SheetTrigger>
      <Button>Show place</Button>
      {/*- begin highlight -*/}
      <Sheet position="bottom" snapPoints={[280]}>
      {/*- end highlight -*/}
        <Heading slot="title" style={{
        "margin-bottom": "4px"
      }}>Harborlight Coffee</Heading>
        <div style={{
        "display": 'flex',
        "align-items": 'center',
        "gap": "8px",
        "color": 'var(--gray-1000)',
        "margin-bottom": "32px"
      }}>
          <Star size={16} fill="currentColor" style={{
          "color": '#ff9500'
        }} />
          <strong>4.6</strong> · Coffee shop · $$
        </div>
        <div style={{
        "display": 'flex',
        "flex-direction": 'column',
        "gap": "16px",
        "align-items": 'start'
      }}>
          <div style={{
          "display": 'flex',
          "gap": "12px",
          "align-items": 'center'
        }}><MapPin size={18} /> 300 Harbor St, Port Marlow</div>
          <div style={{
          "display": 'flex',
          "gap": "12px",
          "align-items": 'center'
        }}><Clock size={18} /> Open until 6:00 PM</div>
          <div style={{
          "display": 'flex',
          "gap": "12px",
          "align-items": 'center'
        }}><Phone size={18} /> (510) 555-0142</div>
          <p>Drag this sheet up to see more, or swipe down to dismiss. Snap points let you preview the most relevant content first, then expand for the full story.</p>
          <Map />
          <Button slot="close">Get directions</Button>
          <h3 style={{
          "margin": '8px 0 0'
        }}>Reviews</h3>
          <div style={{
          "display": 'flex',
          "flex-direction": 'column',
          "gap": "16px",
          "width": '100%'
        }}>
            {reviews.map(review => <div key={review.name} style={{
            "padding": "16px",
            "border": '1px solid var(--gray-300)',
            "border-radius": "12px"
          }}>
                <div style={{
              "display": 'flex',
              "justify-content": 'space-between',
              "gap": "8px",
              "margin-bottom": "8px"
            }}>
                  <strong>{review.name}</strong>
                  <span style={{
                "color": 'var(--gray-700)',
                "font-size": "14px"
              }}>{review.date}</span>
                </div>
                <div style={{
              "display": 'flex',
              "gap": "2px",
              "color": '#ff9500',
              "margin-bottom": "8px"
            }}>
                  {Array.from({
                length: 5
              }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <div>{review.text}</div>
              </div>)}
          </div>
        </div>
      </Sheet>
    </SheetTrigger>;
}

export const title = "Sheet upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
