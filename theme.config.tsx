import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Archipel Project</span>,
  project: {
    link: 'https://github.com/archipel-project',
  },
  docsRepositoryBase: 'https://github.com/archipel-project/docs',
  primaryHue: {
    dark: 40,
    light: 40
  },
  toc: {
    float: true
  },
  useNextSeoProps: () => ({ titleTemplate: '%s – Archipel Project' }),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#222129" />
      <meta httpEquiv="Content-Language" content="fr" />
      <meta name="description" content="Archipel Project: documentation et base de connaissance du projet" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shuding_" />
      <meta property="og:title" content="Archipel Project: documentation et base de connaissance du projet" />
      <meta property="og:description" content="Archipel Project: documentation et base de connaissance du projet" />
      <meta name="apple-mobile-web-app-title" content="Archipel Project" />
    </>
  ),
}

export default config