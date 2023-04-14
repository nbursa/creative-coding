/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        textShadow: {
            'text-shadow': '0 0 20px #ffffff',
        },
        extend: {
            colors: {
                black: '#0F0F14',
                bluish: '#202124',
                slate: '#434C6C',
                gray: '#828AA1',
                white: '#F6F6F6',
                deepPurple: "#0E0220",
                darkRed: "#2D0320",
                maroon: "#450920",
                deepRose: "#691625",
                pinkishRed: "#B92856",
                electricBlue: '#00FFFF',
                neonPurple: '#FF00FF',
                hotPink: '#FF69B4',
                electricGreen: '#00FF00',
                neonYellow: '#FFFF00',
                babyBlue: '#89CFF0',
                lavender: '#B19CD9',
                lightPink: '#FFB6C1',
                mintGreen: '#98FB98',
                paleYellow: '#FAE5D3',
                peach: '#FFE5B4',
                powderBlue: '#B0E0E6',
                rose: '#FFC9B5',
                skyBlue: '#87CEEB',
                softGreen: '#C8F7C5'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
