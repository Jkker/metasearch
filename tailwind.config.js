const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: {
		content: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js', './lib/**/*.js'],
		options: {
			safelist: ['type'], // [type='checkbox']
		},
	},
	important: true,
	darkMode: 'class',
	theme: {
		extend: {
			boxShadow: {
				md: 'rgb(0 0 0 / 6%) 0px 9px 24px',
			},
			spacing: {
				'9/16': '56.25%',
			},
			lineHeight: {
				11: '2.75rem',
				12: '3rem',
				13: '3.25rem',
				14: '3.5rem',
			},
			fontFamily: {
				sans: ['Lexend', ...defaultTheme.fontFamily.sans],
				mono: ['JetBrains Mono', 'ui-monospace', ...defaultTheme.fontFamily.mono],
			},
			colors: {
				// blue: '#76d9e6',
				// 'blue-400': '#78dce8',
				code: {
					green: '#a9dc76',
					yellow: '#ffd866',
					orange: '#fc9867',
					purple: '#ab9df2',
					red: '#ff6188',
					blue: '#78dce8',
					white: '#fcfcfa',
				},
				gray: {
					// 300: '#c1c0c0',
					// 400: '#939293',
					// 500: '#727072',
					600: '#5b595c',
					700: '#2D2A2E',
					800: '#221F22',
					900: '#19181A',
				},
				blue: {
					100: '#bae7ff',
					200: '#91d5ff',
					300: '#69c0ff',
					400: '#40a9ff',
					500: '#1890ff',
					600: '#096dd9',
					700: '#0050b3',
					800: '#003a8c',
					900: '#002766',
				},
			},
		},
	},
	variants: {
		outline: ['focus'],
		border: ['focus'],
		typography: ['dark'],
		extend: {
			opacity: ['dark'],
			boxShadow: ['dark'],
		},
	},
};
