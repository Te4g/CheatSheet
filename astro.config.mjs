// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://te4g.github.io',
	base: 'CheatSheet',
	integrations: [
		starlight({
			title: 'Te4g\'s Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Te4g/CheatSheet' }],
			sidebar: [
				{
					label: 'CheatSheet',
					autogenerate: { directory: 'cheatsheet' },
				}
			],
		}),
	],
});
