import Utils from "./../../services/Utils"
import { fetchMovies, fetchMovie } from "./../../services/Data"
import Movie from './../components/Movie'

let List = {
    page: 1,
    render: async function (page = 1) {
        this.page = page
        let view
        let request = Utils.parseRequestURL()
        let queryString = request.query ? decodeURI(request.query) : ''
        let resp = await fetchMovies(queryString, page)
        if (resp.Response === "True") {
            let movies = resp.Search;
            let arr = [];
            for (let movie of movies) {
                const movieDetail = await fetchMovie(movie.Title)
                arr.push('<div class="col-lg-6 p-3">' + new Movie(movieDetail).render() + '</div>')
            }
            let moviesDOM = arr.join('\n');
            moviesDOM += `<div class="more"></div>`
            if (page > 1) {
                view = `${moviesDOM}`
            } else {
                view = /*html*/`
                    <div class="container">
                        <div class="list">
                            <i class="fa fa-arrow-up list__up"></i>
                            <div class="row">
                                <div class="col-lg-6 offset-lg-3">
                                    <div class="list__title">
                                        <div>
                                            <strong>${queryString} için Sonuçlar</strong>
                                            <span>${resp.totalResults} film bulundu</span>
                                        </div>
                                        <a class="btn btn-link"><i class="fa fa-times"></i></a>
                                    </div>
                                </div>
                                <div class="list__results row">
                                    ${moviesDOM}
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }

        } else if (page === 1) {
            view = /*html*/`
                <div class="container">
                    <div class="list">
                        <div class="row">
                            <div class="col-lg-6 offset-lg-3">
                                <div class="list__title">
                                    <div>
                                        <strong>${queryString} için Sonuçlar</strong>
                                        <span>Kayıt bulunamadı</span>
                                    </div>
                                    <a class="btn btn-link"><i class="fa fa-times"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        return view
    },
    mounted: async function () {
        const self = this;
        document.querySelector('.list__title a').addEventListener('click', () => {
            location.href = '#/'
        })
        window.addEventListener('scroll', function () {
            const listDOM = document.querySelector('.list')
            if (window.scrollY > listDOM.offsetHeight - window.outerHeight - 300) {
                self.loadMore()
            }
        });
        document.querySelector('.list__up').addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'})
        })
    },
    loadMore: async function () {
        let moreDOM = document.querySelector('.list__results .more')
        if (!this.loading && moreDOM) {
            this.loading = true
            let result = await this.render(++this.page)
            if (result) {
                moreDOM.outerHTML = result
            } else {
                moreDOM.remove();
            }
            this.loading = false
        }
    }
}

export default List