import type { App, PluginConfig } from '@vuepress/core'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { gitPlugin } from '@vuepress/plugin-git'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { autoFrontmatterPlugin } from '@vuepress-plume/vuepress-plugin-auto-frontmatter'
import { baiduTongjiPlugin } from '@vuepress-plume/vuepress-plugin-baidu-tongji'
import { blogDataPlugin } from '@vuepress-plume/vuepress-plugin-blog-data'
import { caniusePlugin } from '@vuepress-plume/vuepress-plugin-caniuse'
import { copyCodePlugin } from '@vuepress-plume/vuepress-plugin-copy-code'
import { iconifyPlugin } from '@vuepress-plume/vuepress-plugin-iconify'
import { notesDataPlugin } from '@vuepress-plume/vuepress-plugin-notes-data'
import { commentPlugin } from 'vuepress-plugin-comment2'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { seoPlugin } from 'vuepress-plugin-seo2'
import { sitemapPlugin } from 'vuepress-plugin-sitemap2'
import type {
  PlumeThemeLocaleOptions,
  PlumeThemePluginOptions,
} from '../shared/index.js'
import autoFrontmatter from './autoFrontmatter.js'

export const setupPlugins = (
  app: App,
  options: PlumeThemePluginOptions,
  localeOptions: PlumeThemeLocaleOptions
): PluginConfig => {
  const isProd = !app.env.isDev

  let notesDir: string | undefined
  if (localeOptions.notes !== false) {
    notesDir = localeOptions.notes?.dir
  }

  return [
    palettePlugin({ preset: 'sass' }),
    themeDataPlugin({
      themeData: {
        ...localeOptions,
        notes: localeOptions.notes
          ? { dir: localeOptions.notes.dir, link: localeOptions.notes.link }
          : undefined,
      } as any,
    }),
    autoFrontmatterPlugin(autoFrontmatter(app, localeOptions)),
    blogDataPlugin({
      include: localeOptions.blog?.include,
      exclude: [
        '**/{README,readme,index}.md',
        '.vuepress/',
        ...(localeOptions.blog?.exclude || []),
        notesDir ? `${notesDir}/**` : '',
      ].filter(Boolean),
      sortBy: 'createTime',
      excerpt: true,
      pageFilter(page: any) {
        if (page.frontmatter.article !== undefined) {
          return !!page.frontmatter.article
        }
        return true
      },
      extendBlogData(page: any) {
        return {
          categoryList: page.data.categoryList,
          tags: page.frontmatter.tags,
          sticky: page.frontmatter.sticky,
          createTime: page.data.frontmatter.createTime,
        }
      },
    }),

    localeOptions.notes ? notesDataPlugin(localeOptions.notes) : [],

    iconifyPlugin(),

    activeHeaderLinksPlugin({
      headerLinkSelector: 'a.outline-link',
      headerAnchorSelector: '.header-anchor',
      delay: 200,
      offset: 20,
    }),

    options.nprogress !== false ? nprogressPlugin() : [],

    options.git !== false
      ? gitPlugin({
          createdTime: true,
          updatedTime: true,
          contributors: false,
        })
      : [],

    options.mediumZoom !== false
      ? mediumZoomPlugin({
          selector: '.plume-content > img, .plume-content :not(a) > img',
          zoomOptions: {
            background: 'var(--vp-c-bg)',
          },
          delay: 300,
        })
      : [],

    options.caniuse !== false
      ? caniusePlugin(
          options.caniuse || {
            mode: 'embed',
          }
        )
      : [],

    options.externalLinkIcon !== false
      ? externalLinkIconPlugin({
          locales: Object.entries(localeOptions.locales || {}).reduce(
            (result: Record<string, any>, [key, value]) => {
              result[key] = {
                openInNewWindow:
                  value.openInNewWindow ?? localeOptions.openInNewWindow,
              }
              return result
            },
            {}
          ),
        })
      : [],

    options.search !== false ? searchPlugin(options.search) : [],
    options.docsearch !== false && !options.search
      ? docsearchPlugin(options.docsearch!)
      : [],
    options.prismjs !== false && !isProd ? prismjsPlugin() : [],
    options.shiki !== false && isProd
      ? shikiPlugin({
          theme: 'material-theme-palenight',
          ...options.shiki,
        })
      : [],
    options.copyCode !== false
      ? copyCodePlugin({
          selector: '.plume-content div[class*="language-"] pre',
          locales: {
            '/': {
              copy: '复制成功',
              hint: '复制代码',
            },
          },
          ...options.copyCode,
        })
      : [],

    options.markdownEnhance !== false
      ? mdEnhancePlugin(
          Object.assign(
            {
              container: true, // info note tip warning danger details
              codetabs: true,
              tabs: true,
              align: true,
              mark: true,
              tasklist: true,
              demo: true,
              attrs: true,
            },
            options.markdownEnhance || {}
          )
        )
      : [],

    options.comment !== false ? commentPlugin(options.comment || {}) : [],

    options.baiduTongji !== false && options.baiduTongji?.key
      ? baiduTongjiPlugin(options.baiduTongji)
      : [],

    options.sitemap !== false && localeOptions.hostname && isProd
      ? sitemapPlugin({
          hostname: localeOptions.hostname,
        })
      : [],
    options.seo !== false && localeOptions.hostname && isProd
      ? seoPlugin({
          hostname: localeOptions.hostname || '',
          author: localeOptions.avatar?.name,
        })
      : [],
  ]
}