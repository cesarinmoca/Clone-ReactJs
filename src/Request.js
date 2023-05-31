const API_KEY = "52abd33f37ed4adae2df8ac3891c2bbb";

const requests = {
    fetchTrending: `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=es-MX`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=es-MX`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=es-MX`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=es-MX`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=es-MX`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=es-MX`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=es-MX`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&language=es-MX`,
    fetchRecommendations: `/movie/550/recommendations?api_key=${API_KEY}&language=es-MX`,
};

export default requests;