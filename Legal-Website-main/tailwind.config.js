/** @type {import('tailwindcss').Config} */
const colors= require('tailwindcss/colors');
export default {
  content: [
    './index.html','./src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  
    extend: {
      colors:{
        main:'#D8AE76',
        dark:'#363636',
        bottom:'#272727',
        "light_background":"#F9F9F9",
      },
      padding:{
        extra_large:'15rem',
        large:'6rem',
      },
      backgroundImage:{
        hero:"url('./assets/slide-1.jpg')"
      }
    },
  },
  plugins: [],
}

