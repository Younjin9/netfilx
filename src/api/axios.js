import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "0444d722fac34096094a45f371a10aa7",
        language: "ko-Kr"
    },
});

export default instance;