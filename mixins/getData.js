export default {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async asyncGetData(request) {
            // Start Loading
            this.loading = true
            //Set Token On Authorization Header
            if (request.token) this.$axios.setToken(this.$store.getters.getAccessToken, 'Bearer')
            // Set Logout Request
            return await this.$axios({method: request.method, url: request.url, data: request.data})
                .then(response => {
                    // Stop Loading
                    this.loading = false
                    // Return Error
                    return response.data
                })
                .catch(error => {
                    // Stop Loading
                    this.loading = false
                    // Set Response Error Alert
                    this.$message.error(error.response.data.message)
                    // Return Error Response
                    return error.response.data
                })
        },
        getData(request) {
            // Start Loading
            this.loading = true
            //Set Token On Authorization Header
            if (request.token) this.$axios.setToken(this.$store.getters.getAccessToken, 'Bearer')
            // Set Logout Request
            return this.$axios({method: request.method, url: request.url, data: request.data})
                .then(response => {this.loading = false})
                .catch(error => {
                    // Stop Loading
                    this.loading = false
                    // Set Response Error Alert
                    this.$message.error(error.response.data.message)
                })
        },
    }

}