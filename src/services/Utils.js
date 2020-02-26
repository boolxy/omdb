const Utils = {

    parseRequestURL: () => {

        let url = location.hash.slice(1) || '/';
        let r = url.split("/")
        let request = {
            resource: null,
            query: null,
            verb: null
        }
        request.resource = r[1]
        request.query = r[2]
        request.verb = r[3]

        return request

    },
    
    sleep: (ms) => {

        return new Promise(resolve => setTimeout(resolve, ms));

    }
}

export default Utils;