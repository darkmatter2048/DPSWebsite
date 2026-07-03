import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '功能',
      href: '/homes/startup#features',
    },
    {
      text: '捐赠',
      href: 'https://dyblog.online/donate',
    },
    {
      text: '探索',
      href: 'https://dyblog.online/apps',
    },
    {
      text: '博客',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ text: '下载', href: 'https://pan.quark.cn/s/af35d67635e5', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: '关于我们',
      links: [
        { text: 'Bilibili', href: 'https://space.bilibili.com/1847808902?spm_id_from=333.1007.0.0' },
        { text: 'DaYe博客', href: 'https://dyblog.online/' },
        { text: 'Telegram', href: 'https://t.me/+kRK2MIVK5d80MTA1' },
        { text: 'QQ群1', href: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Wgxe7QkwqIYfSkIqIP2hnwGHWKMdZY58&authKey=lam7sd2TUpdZ1VLrIR%2FyQzYYGcO3SDaLqDpIfWNw7hSA8Df0ZiyEWT5Wm3RTA6Rx&noverify=0&group_code=868824052' },
        { text: 'QQ群2', href: 'https://qm.qq.com/q/dqyQ3sxSHC' },
      ],
    },
    {
      title: '关于软件',
      links: [
        { text: '隐私政策', href: '/privacy' },
        { text: '捐赠', href: 'https://dyblog.online/donate' },
      ],
    },
    {
      title: '鸣谢',
      links: [
        { text: '乔星欢', href: 'https://www.qiaoxh.com/?from=dyblog.online' },
        { text: 'DevPole', href: 'https://www.devpole.com/?from=dyblog.online' },
      ],
    },
    {
      title: '友链',
      links: [
        { text: '星之墨辰', href: 'https://space.bilibili.com/501149848?from=dyblog.online' },
        { text: '玄离199', href: 'https://space.bilibili.com/67079745?from=dyblog.online' },
        { text: 'vladelaina', href: 'https://vladelaina.com/' },
        { text: '是玄夜不是玄月', href: 'https://space.bilibili.com/353516833' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '声明', href: getPermalink('/terms') },
    { text: '隐私政策', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Bilibili', icon: 'tabler:brand-bilibili', href: 'https://space.bilibili.com/1847808902' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/darkmatter2048' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://dyblog.online/assets/logo.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://dyblog.online/"> DaYe</a> · All rights reserved.
  `,
};
