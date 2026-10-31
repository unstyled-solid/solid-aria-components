declare module '*.css' {
  const classes: Record<string, string>;
  export default classes;
}
declare module 'bundle-text:*.svg' {
  const source: string;
  export default source;
}
