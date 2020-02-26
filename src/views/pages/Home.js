import SearchInput from "../components/SearchInput";

let Home = {
    render: async () => {
        let searchInput = await SearchInput.render();
        let view =  /*html*/`
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3">
                        ${searchInput}
                    </div>
                </div>
            </div>
        `
        return view
    },
    mounted: async () => {
        SearchInput.bindings();
    }
}

export default Home;