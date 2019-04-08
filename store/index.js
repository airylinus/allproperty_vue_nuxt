import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            accessToken: '',
            userInfo: '',
            userPermission: []
        },
        mutations: {
            setAccessToken(state, token) {
                state.accessToken = token
                Cookie.set('token', token)
            },
            setJustAccessToken(state, token) {
                state.accessToken = token
            },
            setUser(state, data) {
                state.userInfo = data
            },
            setPermission(state, data) {
                state.userPermission = data
            }
        },
        actions: {
            setAccessToken(vuexContext, token) {
                vuexContext.commit('setAccessToken', token)
            },
            checkToken(vuexContext, req) {
                // Check If Reqiest Isset
                if (req) {
                    // Check If Cookie Isset
                    if (!req.headers.cookie) return
                    // Get Token From Cookie
                    const getToken = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='));
                    // Check Token
                    if (!getToken || getToken == 'token=null') return
                    // Mutation Token
                    vuexContext.commit('setJustAccessToken', getToken.split('=')[1])
                }
            },
            setUser(vuexContext, data) {
                vuexContext.commit('setUser', data)
            },
            setPermission(vuexContext, data) {
                vuexContext.commit('setPermission', data)
            }
        },
        getters: {
            getAccessToken(state) {
                return state.accessToken
            },
            getUser(state) {
                return state.userInfo
            },
            ckeckPermission: (state) => (permission) => {
                return state.userPermission.indexOf(permission) != -1 ? true : false
            }
        }
    })
}

export default createStore