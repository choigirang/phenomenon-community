/** @type {import('tailwindcss').Config} */
module.exports = {
  /** 2024/04/04 - calc class 설정 */
  mode: 'jit',
  content: ['./src/app/**/*.{js,jsx,ts,tsx,mdx}', './src/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        sm: { max: '640px' },
        md: { min: '641px', max: '1024px' },
      },
      fontFamily: {
        logo: ['logo'],
      },
      transitionProperty: {
        custom: 'all', // 사용자 정의 transition 속성을 설정합니다.
      },
      transitionTimingFunction: {
        custom: 'ease-in-out', // 사용자 정의 transition 타이밍 함수를 설정합니다.
      },
      transitionDelay: {
        custom: '1s', // 사용자 정의 transition 딜레이를 설정합니다.
      },
      colors: {
        blue: '#3b4890',
        darkBlue: '#132069',
        lightBlue: '#5365cc',
        pastelBlue: '#E8F0FE',
        red: '#ff4848',
        darkRed: '#d31900',
        lightGray: '#BDC0C5',
        gray: '#777',
      },
      height: {},
      padding: {
        default: 8,
        container: '0 calc((100% - 1280px) / 2)',
      },
      gridTemplateRows: {
        preGallery: 'repeat(5, 1fr)',
      },
      gridTemplateColumns: {
        home: 'auto 250px',
        preGallery: 'repeat(5, 1fr)',
        prePosts: '2fr 1fr 0.7fr 0.5fr 0.5fr .5fr',
        notice: '.5fr 2fr .5fr',
        login: '60% auto',
        comment: '10% 70% 10% auto',
        addComment: '30% 70%',
        user: '30% 70%',
        info: '20% 80%',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['hover'],
    },
  },
  plugins: [],
};
