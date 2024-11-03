import type { Page } from 'vuepress/core'
// import type { BulletinOptions, PlumeThemeLocaleOptions, PlumeThemePageData } from '../../shared/index.js'

/**
 * 处理页面标签，做更多兼容
 * @param page
 */
function processTags(page: Page): void {
  const tags = page.frontmatter.tags

  if (typeof tags === 'string') {
    // 将字符串按逗号分割并去掉空格
    page.frontmatter.tags = tags.split(',').map(tag => tag.trim())
  }
  // 如果是数组，什么都不做
}

/**
 * 处理创建时间，做兼容
 * @param page
 */
function processDateCreated(page: Page): void {
  const dateCreated = page.frontmatter.dateCreated

  if (dateCreated) {
    // 如果有值，则赋值给 createTime
    page.frontmatter.createTime = dateCreated
  }
}

export async function preparedCustom(
  page: Page,
): Promise<void> {
  processTags(page)
  processDateCreated(page)
}
