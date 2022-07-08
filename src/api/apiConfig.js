const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '2060b2cf3499bc7980686e2d6e0d1efe',
  originalImg: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig