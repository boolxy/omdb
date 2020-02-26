import Utils from './../../services/Utils.js'

let timeout

let SearchInput = {
    render: async () => {
        let request = Utils.parseRequestURL()
        let query = request.query ? decodeURI(request.query) : ''
        let view =  /*html*/`
            <div class="search">
                <input class="search__input" id="search__input" placeholder="Bulmak istediğiniz filmin adını yazınız" value="${query}" autocomplete="off" />
                <label for="search__input">
                    <i class="fas fa-search"></i>
                </label>
            </div>
        `
        return view
    },
    bindings: () => {
        document.querySelector('.search__input').addEventListener('keyup', (e) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                let value = e.target.value.trim()
                if (value.length) {
                    location.href = `#/search/${value}`
                } else {
                    location.href = `#/`
                }
            }, 1000)
        })
    }
}

export default SearchInput