let baseURL = `https://omdbapi.com/?apikey=${process.env.API_KEY}&type=movie`

export async function fetchMovies(s, page = 1) {
    let ssName = `movies-${page + '-' + s}`
    let ssMovies = sessionStorage.getItem(ssName)
    if (ssMovies) return JSON.parse(ssMovies)
    const response = await fetch(`${baseURL}&s=${s}&page=${page}`)
    const json = await response.json()
    const movies = json.Search
    sessionStorage.setItem(ssName, JSON.stringify(json))
    return movies
}

export async function fetchMovie(t) {
    let ssName = `movie-${t}`
    let ssMovie = sessionStorage.getItem(ssName)
    if (ssMovie) return JSON.parse(ssMovie)
    const response = await fetch(`${baseURL}&t=${t}`)
    const movie = await response.json()
    sessionStorage.setItem(ssName, JSON.stringify(movie))
    return movie
}