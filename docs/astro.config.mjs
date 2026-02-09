import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightTypeDoc from 'starlight-typedoc';

export default defineConfig({
  site: 'https://ryandward.github.io',
  base: '/Project-1999-Typescript-Discord',
  integrations: [
    starlight({
      title: 'Project 1999 Discord Bot',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/ryandward/Project-1999-Typescript-Discord',
        },
      ],
      components: {
        Head: './src/components/starlight/Head.astro',
      },
      customCss: ['/src/styles/custom.css'],
      plugins: [
        starlightTypeDoc({
          entryPoints: [
            '../index.ts',
            '../types.ts',
            '../client.ts',
            '../app_data.ts',
            '../register_guild_commands.ts',
            '../entities/*.ts',
            '../commands/**/*.ts',
            '../events/*.ts',
            '../services/*.ts',
          ],
          tsconfig: '../tsconfig.typedoc.json',
          sidebar: {
            label: 'API Reference',
            collapsed: true,
          },
          pagination: true,
          typeDoc: {
            entryPointStrategy: 'expand',
            exclude: [
              '**/node_modules/**',
              '../test_orm.ts',
              '../**/*.js',
            ],
            categorizeByGroup: true,
            outputFileStrategy: 'modules',
          },
        }),
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Architecture', slug: 'guides/architecture' },
            { label: 'Setup', slug: 'guides/setup' },
            {
              label: 'Command Reference',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'guides/commands' },
                { label: 'Census', slug: 'guides/commands/census' },
                { label: 'DKP', slug: 'guides/commands/dkp' },
                { label: 'Bank', slug: 'guides/commands/bank' },
                { label: 'Shared Accounts', slug: 'guides/commands/shared-accounts' },
                { label: 'Roles', slug: 'guides/commands/roles' },
                { label: 'Utility', slug: 'guides/commands/utility' },
              ],
            },
            {
              label: 'Data Models',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'guides/data-models' },
                { label: 'Characters', slug: 'guides/data-models/characters' },
                { label: 'DKP & Raids', slug: 'guides/data-models/dkp' },
                { label: 'Bank & Plat', slug: 'guides/data-models/bank' },
                { label: 'Game Reference', slug: 'guides/data-models/reference' },
                { label: 'Shared Accounts & Roles', slug: 'guides/data-models/shared-accounts' },
              ],
            },
            { label: 'Contributing', slug: 'guides/contributing' },
          ],
        },
        {
          label: 'API Reference',
          collapsed: false,
          items: [
            {
              label: 'Core',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'api/readme' },
                { slug: 'api/types' },
                { slug: 'api/client' },
                { slug: 'api/app_data' },
                { slug: 'api/register_guild_commands' },
              ],
            },
            {
              label: 'Entities',
              collapsed: true,
              autogenerate: { directory: 'api/entities' },
            },
            {
              label: 'Commands: Census',
              collapsed: true,
              autogenerate: { directory: 'api/commands/census' },
            },
            {
              label: 'Commands: Bank',
              collapsed: true,
              autogenerate: { directory: 'api/commands/bank' },
            },
            {
              label: 'Commands: DKP',
              collapsed: true,
              autogenerate: { directory: 'api/commands/dkp' },
            },
            {
              label: 'Commands: Utility',
              collapsed: true,
              autogenerate: { directory: 'api/commands/utility' },
            },
            {
              label: 'Events',
              collapsed: true,
              autogenerate: { directory: 'api/events' },
            },
            {
              label: 'Services',
              collapsed: true,
              autogenerate: { directory: 'api/services' },
            },
          ],
        },
      ],
    }),
  ],
});
