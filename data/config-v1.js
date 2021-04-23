export const links = (keyword) => [
  {
    title: '知乎',
    link: `https://www.zhihu.com/search?type=content&q=${keyword}`,
    slug: 'zhihu',
  },
  {
    title: 'Github',
    link: `https://github.com/search?q=${keyword}`,
    slug: 'github',
  },
  {
    title: 'YouTube',
    link: `https://www.youtube.com/results?search_query=${keyword}`,
    slug: 'youtube',
  },
  {
    title: 'MAGI',
    link: `https://magi.com/search?q=${keyword}`,
  },
  {
    title: 'MDN',
    link: `https://developer.mozilla.org/en-US/search?q=${keyword}`,
    slug: 'mdnwebdocs',
  },
  {
    title: 'KAT',
    link: `https://kat.rip/usearch/${keyword}/`,
  },
  // {
  // 	title: '网易云音乐',
  // 	link: `https://music.163.com/#/search/m/?s=${keyword}`,
  // },
  // {
  // 	title: 'Stackoverflow',
  // 	link: `https://stackoverflow.com/search?q=${keyword}`,
  // },
  // {
  // 	title: '鲸准',
  // 	link: `https://rong.jingdata.com/landing/detail?kw=${keyword}`,
  // },
  // {
  // 	title: '简书',
  // 	link: `https://www.jianshu.com/search?q=${keyword}`,
  // },
  // {
  // 	title: '掘金',
  // 	link: `https://juejin.im/search?query=${keyword}&type=all`,
  // },
  // {
  // 	title: '得到',
  // 	link: `https://www.dedao.cn/?search= ${keyword}`,
  // },
  // {
  //   title: "NPM",
  //   link: `https://www.npmjs.com/search?q=${keyword}`
  // },
  // {
  //   title: "中国大学",
  //   link: `https://www.icourse163.org/search.htm?search=${keyword}#/`
  // },
]

export const frames = (keyword, proxy = false) => [
  {
    title: 'Google',
    link: `https://www.google.com/search?igu=1&pws=0&gl=us&gws_rd=cr&source=hp&newwindow=1&q=${keyword}&oq=${keyword}`,
    priority: 10 + (proxy ? 1 : -1),
    slug: 'google',
  },
  {
    title: '百度',
    link: `https://www.baidu.com/s?ie=utf-8&word=${keyword}`,
    priority: 10 + (proxy ? -1 : 1),
    slug: 'baidu',
  },
  {
    title: 'Bing',
    link: `https://www.bing.com/search?q=${keyword}`,
    slug: 'bing',
  },
  // {
  // 	title: '搜狗',
  // 	link: `https://www.sogou.com/web?query=${keyword}`,
  // },
  // {
  {
    title: '有道',
    link: {
      desktop: `https://www.youdao.com/w/${keyword}`,
      mobile: `http://m.youdao.com/dict?q=${keyword}`,
    },
  },
  {
    title: '微博',
    link: `https://s.weibo.com/weibo/${keyword}?topnav=1&wvr=6`,
    slug: 'sinaweibo',
  },
  {
    title: '微信',
    link: `https://weixin.sogou.com/weixin?p=01030402&query=${keyword}&type=2&ie=utf8`,
    slug: 'wechat',
  },
  {
    title: 'bilibili',
    link: `https://search.bilibili.com/all?keyword=${keyword}`,
    slug: 'bilibili',
  },
  {
    title: '淘宝',
    link: `https://s.taobao.com/search?q=${keyword}`,
    slug: 'taobao',
  },
  {
    title: '京东',
    link: `https://search.jd.com/Search?keyword=${keyword}&enc=utf-8&spm=2.1`,
    slug: 'JD',
  },

  // {
  // 	title: '语雀',
  // 	link: `https://www.yuque.com/search?&q=${keyword}`,
  // },
  {
    title: '百度指数',
    link: `https://index.baidu.com/v2/main/index.html#/trend/${keyword}?words=${keyword}`,
    slug: 'baidu',
  },
  // {
  //   title: "SegmentFault",
  //   link:  `https://segmentfault.com/search?q=${keyword}`,
  // },

  // {
  //   title: "Yarn",
  //   link: `https://www.yarnpkg.com/zh-Hans/packages?q=${keyword}`
  // },

  // {
  // 	title: '豆瓣',
  // 	link: `https://www.douban.com/search?q=${keyword}`,
  // },
  // {
  //   title: "产品",
  //   link: `http://api.woshipm.com/search/list.html?key=${keyword}`
  // },
  // {
  //   title: "TalkingData",
  //   link: `http://mi.talkingdata.com/search.html?keyword=${keyword}`
  // },
  // {
  // 	title: '极客搜索',
  // 	link: `https://s.geekbang.org/search/c=0/k=${keyword}/t=`,
  // },
]
