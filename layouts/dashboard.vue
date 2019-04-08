<template>
    <div>
        <el-container style="height: calc(100vh); border: 1px solid #eee">
            <el-aside width="250px">
                <side-bar/>
            </el-aside>

            <el-container>
                <el-header>
                    <el-dropdown trigger="click" style="margin-top: 10px;">
                        <el-button >
                            {{ this.$store.getters.getUser.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="editProfile">Edit Profile</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">Logout</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>

                <el-main>
                    <nuxt />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    import SideBar from '@/components/SideBar'
    // Get Data Mixin
    import getData from '@/mixins/getData'

    export default {
        middleware: 'checkUserInfo',
        components: {SideBar},
        mixins: [getData],
        methods: {
            logout() {
                // Log Out User
                this.asyncGetData({
                    token: true,
                    method: 'POST',
                    url: 'logout'
                }).then(() => {
                    // Save Token
                    this.$store.dispatch('setAccessToken', null)
                    // Redirect To Login Page
                    this.$router.push('/')
                })
            },
            editProfile() {
                // Redirect To User Edit Page
                this.$router.push('/dashboard/user/' + this.$store.getters.getUser.id)
            }
        }
    }
</script>

<style>
    html {
        font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    *{
        margin: 0;
        padding: 0;
    }

    .el-header {
        text-align: right;
        font-size: 12px;
    }

    .el-main {
        background-color: #f9f9f9;

    }

    .el-aside {
        background-color: #fff;
        border-right: solid 1px #e6e6e6;
    }
</style>