declare module 'textarea-caret' {
    export default function getCaretRect(element: HTMLTextAreaElement, position: number): {
        top: number;
        left: number;
        height: number;
    };
}
