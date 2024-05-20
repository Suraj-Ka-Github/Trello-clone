module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        homePageBackground: '#1D2125',
        borderColor:'#333D42',
        asideColor : '#1A1E26',
        boardSelected: '#606268',
        skyblue: '#569CFF'
      },
      gridTemplateColumns:{
        '1fr-max':'1fr max-content'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
