export default function (context) {
    // Get Token From Cookie
    context.store.dispatch('checkToken', context.req)
    // Check If Token Isset
    if (context.store.getters.getAccessToken) {
        // Set Token On Authorization Header
        context.$axios.setToken(context.store.getters.getAccessToken, 'Bearer')
        // Get User Info
        return context.$axios.get('get/user/info')
            .then(response => {
                // Save User info
                context.store.dispatch('setUser', response.data.data.userInfo)
                // Set User permissionm
                context.store.dispatch('setPermission', response.data.data.permission)
            })
            .catch(error => {
                console.log(error.response.data.message)
                // If Something Went Wrong Then Clear Token
                context.store.dispatch('setAccessToken', null)
            });
    }
}