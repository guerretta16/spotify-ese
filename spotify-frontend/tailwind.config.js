/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({opacityValue}) => {
    if(opacityValue !== undefined){
      return `rgb(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '100': 'calc(100vh - 3.5rem)'
      },
      textColor:{
        skin: {
          base: 'var(--color-text-base)',
          alter: 'var(--color-text-alter)',
          ph: 'var(--color-text-ph)',
          link: 'var(--color-text-link)',
        },
      },
      backgroundColor:{
        skin: {
          main: withOpacity('--color-main-base'),
          'base': 'var(--color-bg-base)',
          'base-hover': 'var(--color-bg-base-hover)',
          top: 'var(--color-bg-top)',
          card: 'var(--color-bg-card)',
          delete: 'var(--color-bg-delete)',
          'delete-hover': 'var(--color-bg-delete-hover)',
          info: 'var(--color-bg-info)',
          'info-hover': 'var(--color-bg-info-hover)',
        }
      },
    },
  },
  plugins: [],
}

