import SearchInput from "../components/SearchInput"
import InstantSearchResults from "../components/InstantSearchResults"

let Search = {
    render: async () => {
        let searchInput = await SearchInput.render()
        let instantSearchResults = await InstantSearchResults.render()
        let view =  /*html*/`
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 offset-lg-3 offset-md-3">
                        ${searchInput}
                        ${instantSearchResults}
                    </div>
                </div>
            </div>
        `
        return view
    },
    mounted: async () => {
        SearchInput.bindings()
        InstantSearchResults.bindings()
    }
}

export default Search