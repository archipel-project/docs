/* eslint sort-keys: error */
import type { NextSeoProps } from 'next-seo'
import type { Item } from 'nextra/normalize-pages'
import { isValidElement, type FC, type ReactNode } from 'react'
import { z } from 'zod'
import type { NavBarProps } from './components/navbar'
import { themeOptionsSchema, ThemeSwitch } from './components/theme-switch'
import type { TOCProps } from './components/toc'


export const IS_BROWSER = typeof window !== 'undefined'

function isReactNode(value: unknown): boolean {
  return (
    value == null ||
    isString(value) ||
    isFunction(value) ||
    isValidElement(value as any)
  )
}

function isFunction(value: unknown): boolean {
  return typeof value === 'function'
}

function isString(value: unknown): boolean {
  return typeof value === 'string'
}

const i18nSchema = z.array(
  z.strictObject({
    direction: z.enum(['ltr', 'rtl']).optional(),
    locale: z.string(),
    text: z.string()
  })
)

const reactNode = [
  isReactNode,
  { message: 'Must be React.ReactNode or React.FC' }
] as const
const fc = [isFunction, { message: 'Must be React.FC' }] as const

export const themeSchema = z.strictObject({
  banner: z.strictObject({
    dismissible: z.boolean(),
    key: z.string(),
    text: z.custom<ReactNode | FC>(...reactNode).optional()
  }),
  chat: z.strictObject({
    icon: z.custom<ReactNode | FC>(...reactNode),
    link: z.string().startsWith('https://').optional()
  }),
  components: z.record(z.custom<FC>(...fc)).optional(),
  darkMode: z.boolean(),
  direction: z.enum(['ltr', 'rtl']),
  docsRepositoryBase: z.string().startsWith('https://'),
  editLink: z.strictObject({
    component: z.custom<
      FC<{
        children: ReactNode
        className?: string
        filePath?: string
      }>
    >(...fc),
    text: z.custom<ReactNode | FC>(...reactNode)
  }),
  faviconGlyph: z.string().optional(),
  feedback: z.strictObject({
    content: z.custom<ReactNode | FC>(...reactNode),
    labels: z.string(),
    useLink: z.function().returns(z.string())
  }),
  footer: z.strictObject({
    component: z.custom<ReactNode | FC<{ menu: boolean }>>(...reactNode),
    text: z.custom<ReactNode | FC>(...reactNode)
  }),
  gitTimestamp: z.custom<ReactNode | FC<{ timestamp: Date }>>(...reactNode),
  head: z.custom<ReactNode | FC>(...reactNode),
  i18n: i18nSchema,
  logo: z.custom<ReactNode | FC>(...reactNode),
  logoLink: z.boolean().or(z.string()),
  main: z.custom<FC<{ children: ReactNode }>>(...fc).optional(),
  navbar: z.strictObject({
    component: z.custom<ReactNode | FC<NavBarProps>>(...reactNode),
    extraContent: z.custom<ReactNode | FC>(...reactNode).optional()
  }),
  navigation: z.boolean().or(
    z.strictObject({
      next: z.boolean(),
      prev: z.boolean()
    })
  ),
  nextThemes: z.strictObject({
    defaultTheme: z.string(),
    forcedTheme: z.string().optional(),
    storageKey: z.string()
  }),
  notFound: z.strictObject({
    content: z.custom<ReactNode | FC>(...reactNode),
    labels: z.string()
  }),
  primaryHue: z.number().or(
    z.strictObject({
      dark: z.number(),
      light: z.number()
    })
  ),
  project: z.strictObject({
    icon: z.custom<ReactNode | FC>(...reactNode),
    link: z.string().startsWith('https://').optional()
  }),
  search: z.strictObject({
    component: z.custom<
      ReactNode | FC<{ className?: string; directories: Item[] }>
    >(...reactNode),
    emptyResult: z.custom<ReactNode | FC>(...reactNode),
    error: z.string().or(z.function().returns(z.string())),
    loading: z.custom<ReactNode | FC>(...reactNode),
    // Can't be React component
    placeholder: z.string().or(z.function().returns(z.string()))
  }),
  serverSideError: z.strictObject({
    content: z.custom<ReactNode | FC>(...reactNode),
    labels: z.string()
  }),
  sidebar: z.strictObject({
    autoCollapse: z.boolean().optional(),
    defaultMenuCollapseLevel: z.number().min(1).int(),
    titleComponent: z.custom<
      ReactNode | FC<{ title: string; type: string; route: string }>
    >(...reactNode),
    toggleButton: z.boolean()
  }),
  themeSwitch: z.strictObject({
    component: z.custom<ReactNode | FC<{ lite?: boolean; className?: string }>>(
      ...reactNode
    ),
    useOptions: themeOptionsSchema.or(z.function().returns(themeOptionsSchema))
  }),
  toc: z.strictObject({
    component: z.custom<ReactNode | FC<TOCProps>>(...reactNode),
    extraContent: z.custom<ReactNode | FC>(...reactNode),
    float: z.boolean(),
    headingComponent: z
      .custom<FC<{ id: string; children: string }>>(...fc)
      .optional(),
    title: z.custom<ReactNode | FC>(...reactNode)
  }),
  useNextSeoProps: z.custom<() => NextSeoProps | void>(isFunction)
})

const publicThemeSchema = themeSchema.deepPartial().extend({
  // to have `locale` and `text` as required properties
  i18n: i18nSchema.optional()
})

export type DocsThemeConfig = z.infer<typeof themeSchema>
export type PartialDocsThemeConfig = z.infer<typeof publicThemeSchema>
