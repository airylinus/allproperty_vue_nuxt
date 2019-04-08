export default {
    data() {
        return {
            tableData: [],
            loading: false
        }
    },
    methods: {
        getTableData(request) {
            // Start Loading
            this.loading = true;
            //Set Token On Authorization Header
            if (request.token) this.$axios.setToken(this.$store.getters.getAccessToken, 'Bearer')
            // Set Logout Request
            this.$axios({method: request.method, url: request.url, data: request.data})
                .then(response => {
                    // Get Table Date
                    this.tableData = response.data.data
                    // Stop Loading
                    this.loading = false;
                })
                .catch(error => {
                    // Set Response Error Alert
                    this.$message.error(error.response.data.message)
                    // Stop Loading
                    this.loading = false;
                })
        }
    }

}