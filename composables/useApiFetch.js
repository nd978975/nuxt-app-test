export const useApiFetch = (path, options) => {
    let headers = {}

    const token = useCookie("XSRF-TOKEN")
    if(token.value) {
        headers['X-XSRF-TOKEN'] = token.value
    }
    headers['accept'] = "application/json"

    if(process.server) {
        headers = {
            ...headers,
            ...useRequestHeaders(['cookie']),
            referer: "http://localhost:8000/"
        }
    }

    return useFetch("http://localhost:8000/" + path, {
        credentials: "include",
        watch: false,
        ...options,
    })
}