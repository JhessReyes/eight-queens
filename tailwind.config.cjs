/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#0A2647',
					secondary: '#144272',
					accent: '#205295',
					neutral: '#2C74B3',
					'base-100': '#FFFFFF',
					info: '#93E7FB',
					success: '#81CFD1',
					warning: '#EFD7BB',
					error: '#E58B8B'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
