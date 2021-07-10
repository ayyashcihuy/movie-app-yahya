const axios = require("axios");

const axiosFetchUrl = axios.create({
    baseURL: "https://upload.imagekit.io/api/v1/files",
})

module.exports = axiosFetchUrl