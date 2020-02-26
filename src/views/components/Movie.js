import Utils from './../../services/Utils.js'

class Movie {
    constructor(movie) {
        this.data = movie
    }
    render() {
        let request = Utils.parseRequestURL()
        let queryString = request.query ? decodeURI(request.query) : ''
        let { Poster, Title, Year, Language, Actors, Plot, imdbRating } = this.data;
        let regex = new RegExp(`(.*)(${queryString})(.*)`, 'i');
        let view =  /*html*/`
            <div class="movie">
                <div class="row">
                    <div class="col-lg-5 text-center">
                        ${Poster!=="N/A"?`<img src="${Poster}">`:`<i class="fa fa-image"></i>`}
                    </div>
                    <div class="col-lg-7">
                        <div class="movie__title">
                            <h2>${Title.replace(regex, `$1<span class="emphasis">$2</span>$3`)} (${Year})</h2>
                            <div class="movie__rating"><i class="fas fa-star"></i><span><strong>${imdbRating}</strong> / 10</span></div>
                        </div>
                        <p><strong>Dil:</strong> <span>${Language}</span></p>
                        <p><strong>Oyuncular:</strong> <span>${Actors}</span></p>
                        <p>${Plot}</p>
                    </div>
                </div>
            </div>
        `
        return view
    }
}

export default Movie