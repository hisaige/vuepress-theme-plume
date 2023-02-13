import type { App, Page, Theme } from '@vuepress/core'
import { fs, getDirname, path } from '@vuepress/utils'
import type { PlumeThemeOptions, PlumeThemePageData } from '../shared/index.js'
import { setupPlugins } from './plugins.js'
import { autoCategory, pageContentRendered, setupPage } from './setupPages.js'

const __dirname = getDirname(import.meta.url)

export const plumeTheme = ({
  themePlugins = {},
  ...localeOptions
}: PlumeThemeOptions = {}): Theme => {
  return (app: App) => {
    return {
      name: '@vuepress-plume/theme-plume',
      templateBuild: path.resolve(__dirname, '../../templates/build.html'),
      alias: {
        ...Object.fromEntries(
          fs
            .readdirSync(path.resolve(__dirname, '../client/components'))
            .filter((file) => file.endsWith('.vue'))
            .map((file) => [
              `@theme/${file}`,
              path.resolve(__dirname, '../client/components', file),
            ])
        ),
      },
      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
      plugins: setupPlugins(app, themePlugins, localeOptions),
      onInitialized: async (app) => {
        await setupPage(app)
      },
      extendsPage: (page: Page<PlumeThemePageData>) => {
        if (page.path === '/blog/') {
          page.data.type = 'blog'
        }
        if (page.path === '/product/') {
          page.data.type = 'product'
        }
        autoCategory(page, localeOptions)
        pageContentRendered(page)
      },
    }
  }
}
