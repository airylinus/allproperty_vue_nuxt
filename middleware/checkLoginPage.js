export default function (context) {
    if (context.store.getters.getAccessToken) {
        context.redirect('/dashboard')
    }
}