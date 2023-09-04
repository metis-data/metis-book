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
  url: 'https://app.metisdata.io/',
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

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          routeBasePath: '/',
          //   sidebarPath: require.resolve('./sidebars.js'),
          //   // Please change this to your repo.
          //   // Remove this to remove the "edit this page" links.
          //   editUrl: 'https://github.com/metis-data',
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
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logoDark.svg',
      baseUrl: '/docs/MetisOverview',
      navbar: {
        title: 'Metis Doc',
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
            href: 'https://demo.metisdata.io/',
            label: 'Demo',
            position: 'right',
          },
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
        copyright: `Copyright © ${new Date().getFullYear()} Metis Built with ❤️`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
