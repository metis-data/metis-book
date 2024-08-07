// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Metis',
  tagline: 'Stop guessing, never go blind again',
  favicon: 'https://app.metisdata.io/assets/logo-278e43ab.svg',

  // Set the production url of your site here
  url: 'https://docs.metisdata.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'metis', // Usually your GitHub org/user name.
  projectName: 'metis-book', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  scripts: [
    {
      src: '/js/segment.js',
      async: false,
    },
    {
      src: '/js/posthog.js',
      async: false,
    },
    {
      src: '/js/customerly.js',
      async: false,
    },
  ],
  plugins: [require.resolve('docusaurus-plugin-image-zoom')],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          routeBasePath: '/',
          breadcrumbs: true,
          editUrl: 'https://github.com/metis-data/metis-book/tree/main/',
        },
        blog: false,
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //},
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-9FV7PMQBG1',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      },
    ],
  ],
  // themes: ['@docusaurus/theme-search-algolia'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/metisLogo.png',
      baseUrl: '/docs/MetisOverview',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      algolia: {
        indexName: 'metis-doc',
        appId: 'VETEG1WAIE',
        apiKey: '151460c121728a1543c236722d97a230',
        // Optional: see doc section below
        contextualSearch: true,

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'docs',

        container: 'div',
      },
      navbar: {
        title: 'Metis Documentation',
        logo: {
          alt: 'Metis Doc Logo',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/metis-data',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/',
              },
              {
                label: 'Quickstart',
                to: '/Quickstart',
              },
              {
                label: 'Query Analyzer',
                to: '/Query%20analyzer',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/D7PvX5bMyt?_gl=1*1exsdp5*_gcl_au*MTgwMDQ5MzY4LjE2OTI2OTE4Nzk.',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/metisdata',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/metis-data',
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/D7PvX5bMyt?_gl=1*1exsdp5*_gcl_au*MTgwMDQ5MzY4LjE2OTI2OTE4Nzk.',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Metis built with ❤️`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        {
          name: 'description',
          content:
            'Improve database performance with our observability tool. Monitor & optimize queries in real-time to prevent production issues. Get started for free today!',
        },
        { name: 'og:title', content: 'Database Observability by Metis - Keep Production In Check' },
        { name: 'twitter:title', content: 'Database Observability by Metis - Keep Production In Check' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'Database Observability by Metis - Keep Production In Check' },
        {
          name: 'og:description',
          content:
            'Improve database performance with our observability tool. Monitor & optimize queries in real-time to prevent production issues. Get started for free today!',
        },
        {
          name: 'twitter:description',
          content:
            'Improve database performance with our observability tool. Monitor & optimize queries in real-time to prevent production issues. Get started for free today!',
        },
        {
          name: 'og:image',
          content: 'https://uploads-ssl.webflow.com/62d69ddf7813e9ad935e731f/63233be643cb042586cd7e13_Metis%20OpenGraph.png',
        },
        {
          name: 'twitter:image',
          content: 'https://uploads-ssl.webflow.com/62d69ddf7813e9ad935e731f/63233be643cb042586cd7e13_Metis%20OpenGraph.png',
        },
      ],
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)',
          },
        },
      },
    }),
};

module.exports = config;
