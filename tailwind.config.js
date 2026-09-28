export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {
    fontSize: {
      base: '16px',
    },
    colors: {
      evergreen: '#082015',
      primary:   '#17736a',
      verdigris: '#259d91',
      copper:    '#d6503f',
      mist:      '#c9e1e1',
    },
    fontFamily: {
      display: ['Poppins', 'system-ui', 'sans-serif'],
      sans:    ['Inter', 'system-ui', 'sans-serif'],
      script:  ['Satisfy', 'cursive'],
    },
  } },
  plugins: [],
};
