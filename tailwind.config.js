/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      'xs': 'calc(10px + 0.2vw)',
      'sm': 'calc(12px + 0.3vw)',
      'base': 'calc(14px + 0.4vw)',
      'lg': 'calc(16px + 0.5vw)',
      'xl': 'calc(18px + 0.6vw)',
      '2xl': 'calc(20px + 0.8vw)',
      '3xl': 'calc(24px + 1vw)',
      '4xl': 'calc(30px + 1.2vw)',
      '5xl': 'calc(36px + 1.5vw)',
      '6xl': 'calc(48px + 2vw)',
      '7xl': 'calc(64px + 3vw)',
      '8xl': 'calc(72px + 4vw)',
      '9xl': 'calc(96px + 5vw)',
    },
    textShadow: {
      'text-shadow': '0 0 20px #ffffff',
    },
    extend: {
      colors: {
        black: '#0F0F14',
        bluish: '#202124',
        slate: '#434C6C',
        grayc: '#828AA1',
        white: '#F6F6F6',
        deepPurple: '#0E0220',
        darkRed: '#2D0320',
        maroon: '#450920',
        deepRose: '#691625',
        pinkishRed: '#B92856',
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
};
