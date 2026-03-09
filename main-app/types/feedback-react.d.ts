declare module '*company/feedbackreact/*' {
  const content: any
  export default content
}

declare module '*company/feedbackreact/feedbackreact/*' {
  const content: any
  export default content
}

// fallback for any .jsx import from the imported packages
declare module '*.jsx' {
  const content: any
  export default content
}
