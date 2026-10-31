declare module '*.json' {
  const messages: import('@internationalized/string').LocalizedStrings<string, import('@internationalized/string').LocalizedString>;
  export default messages;
}
