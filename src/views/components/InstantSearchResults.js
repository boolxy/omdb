import Utils from './../../services/Utils'
import {fetchMovies, fetchMovie} from './../../services/Data'
import Movie from './Movie'

let InstantSearchResults = {
    render: async () => {
        let request = Utils.parseRequestURL()
        let queryString = request.query ? decodeURI(request.query) : ''
        let view
        let resp = await fetchMovies(queryString)
        if (resp.Response === "True") {
            let movies = resp.Search.slice(0, 2)
            let arr = [];
            for (let movie of movies) {
                const movieDetail = await fetchMovie(movie.Title)
                arr.push(new Movie(movieDetail).render())
            }
            let moviesDOM = arr.join('\n');
            view = /*html*/`
                <div class="instant-search">
                    <div class="instant-search__results">
                        ${moviesDOM}
                    </div>
                    <hr class="m-0" />
                    <a class="btn btn-link btn-block"> DAHA FAZLA SONUÇ >> </a>
                </div>
            `
        } else {
            view = /*html*/`
                <div class="instant-search">
                    <div class="p-3">Kayıt bulunamadı</div>
                </div>
            `
        }
        return view
    },
    bindings: async () => {
        const btn = document.querySelector('.instant-search .btn')
        if (btn) {
            btn.addEventListener('click', () => {
                let request = Utils.parseRequestURL()
                let queryString = request.query ? decodeURI(request.query) : ''
                location.href = `#/list/${queryString}`
            })
        }
    }
}

export default InstantSearchResults