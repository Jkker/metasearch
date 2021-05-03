export const placeholderText = (locale) => {
  switch (locale) {
    case 'en-US':
      return "Find exactly what you're looking for"
    case 'zh-CN':
      return '搜你所想'
    default:
      return ''
  }
}
