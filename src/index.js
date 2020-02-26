import 'bootstrap'
import './style.scss'

import Utils from './services/Utils.js'

import Home from './views/pages/Home.js'
import List from './views/pages/List.js'
import Search from './views/pages/Search.js'
import Error404 from './views/pages/Error404.js'

// Supported Routes
const routes = {
    '/': Home,
    '/list/:q': List,
    '/list': List,
    '/search/:q': Search,
    '/search': Search
};

// Router
const router = async () => {

    // Wrapper
    const wrapper = null || document.getElementById('app')

    // Get the parsed URL
    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') +
        (request.query ? '/:q' : '') +
        (request.verb ? '/' + request.verb : '')

    // Get the page
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    wrapper.innerHTML = await page.render()
    if (typeof page.mounted === 'function') {
        page.mounted()
    }

    // Refocus the input
    let searchInputDOM = wrapper.querySelector('.search__input')
    if (searchInputDOM) {
        searchInputDOM.focus()
        searchInputDOM.selectionStart = searchInputDOM.selectionEnd = searchInputDOM.value.length
    }

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);