---
pageLayout: home
config:
  -
    type: hero
    full: true
    background: tint-plate
    hero:
      name: ... ...
      tagline:
      text: 大A如镜映照，贪婪与恐惧无所遁形
      actions:
        -
          theme: brand
          text: 博客
          link: /blog/
        -
          theme: alt
          text: Github
          link: https://github.com
---

<div style="max-width: 960px;margin:0 auto;">

::: center
![GitHub Repo stars](https://img.shields.io/github/stars/pengzhanbo/vuepress-theme-plume)
![npm version](https://img.shields.io/npm/v/vuepress-theme-plume?color=32A9C3&labelColor=1B3C4A&label=npm)
![npm downloads](https://img.shields.io/npm/dy/vuepress-theme-plume?color=32A9C3&labelColor=1B3C4A&label=downloads)
![github license](https://img.shields.io/github/license/pengzhanbo/vuepress-theme-plume?color=32A9C3&labelColor=1B3C4A)
:::

### 安装

:::code-tabs
@tab pnpm

```sh
pnpm add vuepress@next vuepress-theme-plume vue
```

@tab npm

```sh
npm install vuepress@next vuepress-theme-plume
```

@tab yarn

```sh
yarn add vuepress@next vuepress-theme-plume
```

:::

### 配置

::: code-tabs
@tab .vuepress/config.ts

```ts :no-line-numbers
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  // vuepress config...
  theme: plumeTheme({
    // theme config...
  })
})
```

:::

### 更新记录

[Changelog](./changelog.md)

### 贡献者

<Contributors
  :contributors="[
    'pengzhanbo',
    { github: 'huankong233', name: 'huan_kong' },
    { github: 'northword', name: 'Northword' },
    'KrLite',
    'shylock-wu',
    'hrradev',
    { github: 'TheCoderAlex', name: 'Tang Zifeng' },
    { github: 'HydroGest', name: 'MarkChai'}
  ]"
/>

</div>
