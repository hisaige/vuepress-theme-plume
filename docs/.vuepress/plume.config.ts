import path from 'node:path'
import { defineThemeConfig } from 'vuepress-theme-plume'
import { zhNavbar } from './navbar.js'
import { zhNotes } from './notes/index.js'

export default defineThemeConfig({
  logo: '/plume.png',

  profile: {
    avatar: '/plume.png',
    name: 'Plume Theme',
    description: 'The Theme for Vuepress 2.0',
    location: 'ShenZhen, China',
    organization: 'hisaige',
  },

  social: [
    { icon: 'github', link: 'https://github.com' },
  ],
  navbarSocialInclude: ['github'],

  footer: {
    message: 'Powered by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
    copyright: 'Copyright © 2024-present hisaige'
      + '<br />'
      + '<a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">琼ICP备2024042404号-1</a>',
  },

  locales: {
    '/': {
      notes: zhNotes,
      navbar: zhNavbar,
    },
  },

  encrypt: {
    rules: {
      '/article/enx7c9s/': '123456',
    },
  },
  autoFrontmatter: { exclude: ['**/*.snippet.*'] },

  bulletin: {
    layout: 'top-right',
    lifetime: 'always',
    title: '🎉 公告 🎉',
    contentFile: path.join(__dirname, 'bulletin.md'),
    enablePage: page => page.path === '/guide/features/bulletin/',
  },
})
