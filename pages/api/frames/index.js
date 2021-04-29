const DEFAULT_LOCALE = 'zh-CN'
export default async function handler(req, res) {
  res.redirect(`/api/frames/${DEFAULT_LOCALE}`);
}
