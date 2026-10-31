export function inertValue(value?: boolean): boolean | undefined {
  // Native DOM rendering serializes inert as a boolean attribute: true adds it,
  // false removes it. React-version compatibility is not a native concern.
  return value;
}
