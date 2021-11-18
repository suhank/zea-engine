const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Zea Engine Docs',
  tagline: 'Fast, Easy, Open',
  url: 'https://www.zea.live/',
  baseUrl: '/zea-engine/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon2.ico',
  organizationName: 'Zea Inc.', // Usually your GitHub org/user name.
  projectName: 'Zea Engine Docs', // Usually your repo name.
  trailingSlash: false,

  // plugins: [
  //   [
  //     'docusaurus-plugin-typedoc',
  //     {
  //       out: '../typedoc-out',
  //       sidebar: {
  //         categoryLabel: 'API',
  //         position: 0,
  //         fullNames: false,
  //       },
  //       entryPoints: ['../src/'],
  //       entryPointStrategy: 'expand',
  //       exclude: [
  //         '**/*+(**Impl|**PostCommand|**WsCommand|**index).ts',
  //         '**/decoders/*',
  //         '**/*+(**Utils).ts',
  //         '**/*.test.ts',
  //       ],
  //       // excludePrivate: true,
  //     },
  //   ],
  // ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/ZeaInc/zea-engine/', // TODO:
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // TODO:
      // algolia: {
      //   apiKey: 'YOUR_API_KEY',
      //   indexName: 'YOUR_INDEX_NAME',

      //   // Optional: see doc section below
      //   contextualSearch: true,

      //   // Optional: see doc section below
      //   appId: 'YOUR_APP_ID',

      //   // Optional: Algolia search parameters
      //   searchParameters: {},

      //   //... other Algolia params
      // },
      colorMode: {
        // bar: #2D2D2D
        disableSwitch: true,
        //defaultMode: 'dark',
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Zea logo',
          src: 'img/logo-zea.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'Manual/intro',
            position: 'left',
            label: 'Manual',
          },
          {
            type: 'doc',
            docId: 'API/index',
            position: 'left',
            label: 'API',
          },
          {
            type: 'doc',
            docId: 'Tutorials/tutorials',
            position: 'left',
            label: 'Tutorials',
          },
          {
            type: 'doc',
            docId: 'Plugins/plugins-templates-overview',
            position: 'left',
            label: 'Plugins',
          },
          {
            type: 'doc',
            docId: 'Community/c1',
            position: 'left',
            label: 'Community',
          },
          // {
          //   type: 'doc',
          //   docId: 'Examples/change-color-geom',
          //   position: 'left',
          //   label: 'Examples'
          // },
          // {
          //   type: 'doc',
          //   docId: 'playground',
          //   position: 'left',
          //   label: 'Playground'
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://zea.live',
            label: 'zea.live',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Zea',
            items: [
              {
                label: 'Website',
                href: 'https://www.zea.live/',
              },
              {
                label: 'Blog',
                href: 'https://blog.zea.live/en/blog',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Zea Community',
                href: 'https://community.zea.live/',
              },
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              // },
              // {
              //   label: 'Discord',
              //   href: 'https://discordapp.com/invite/docusaurus',
              // },
              // {
              //   label: 'Twitter',
              //   href: 'https://twitter.com/docusaurus',
              // },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ZeaInc/zea-engine',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Zea Inc.`,
      },
      prism: {
        theme: darkCodeTheme, //lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}
