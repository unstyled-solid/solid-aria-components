// The actual source CSS is transformed to a class-name map by the existing runner.
declare module '*.css' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
