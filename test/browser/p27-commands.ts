// Frozen vitest.browser.config.ts:167–202,278–335.
// Source clipboard serialization and trusted Chromium IME commands, not DOM emulation.
let unlock: ((value: any) => void) | null = null;

const cdpSessions = new WeakMap<object, Promise<any>>();
function getCDP(page: any, context: any): Promise<any> {
  let session = cdpSessions.get(page);
  if (!session) {
    session = context.newCDPSession(page);
    cdpSessions.set(page, session!);
  }
  return session!;
}

declare module 'vitest/browser' {
  interface BrowserCommands {
    lockClipboard: () => Promise<void>;
    unlockClipboard: () => void;
    setComposition: (
      text: string,
      selectionStart: number,
      selectionEnd: number,
      replacementStart?: number,
      replacementEnd?: number
    ) => Promise<void>;
    commitComposition: (text: string) => Promise<void>;
    mouseDownOnElement: (selector: string, offsetX?: number, offsetY?: number) => Promise<void>;
    mouseUp: () => Promise<void>;
  }
}

export const sourceBrowserCommands = {
  lockClipboard: async () => {
    await new Promise(resolve => {
      navigator.locks.request('clipboard', async () => {
        resolve(null);
        await new Promise(resolve1 => {
          unlock = resolve1;
        });
      });
    });
  },
  unlockClipboard: () => {
    if (unlock) {
      unlock(null);
      unlock = null;
    }
  },
  setComposition: async (
    {page, context}: any,
    text: string,
    selectionStart: number,
    selectionEnd: number,
    replacementStart?: number,
    replacementEnd?: number
  ) => {
    const cdp = await getCDP(page, context);
    const params: Record<string, unknown> = {text, selectionStart, selectionEnd};
    if (replacementStart != null) {
      params.replacementStart = replacementStart;
    }
    if (replacementEnd != null) {
      params.replacementEnd = replacementEnd;
    }
    await cdp.send('Input.imeSetComposition', params);
  },
  commitComposition: async ({page, context}: any, text: string) => {
    const cdp = await getCDP(page, context);
    await cdp.send('Input.insertText', {text});
  },
  mouseDownOnElement: async (
    {page, iframe}: any,
    selector: string,
    offsetX: number = 5,
    offsetY?: number
  ) => {
    const box = await iframe.locator(selector).boundingBox();
    const x = box.x + offsetX;
    const y = offsetY == null ? box.y + box.height / 2 : box.y + offsetY;
    await page.mouse.move(x, y);
    await page.mouse.down();
  },
  mouseUp: async ({page}: any) => {
    await page.mouse.up();
  }
};
