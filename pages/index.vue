<template>
    <el-row>
        <el-col :span="8" :offset="8">
            <p>Login</p>
            <el-input placeholder="Email" autofocus v-model="form.email"></el-input>
            <div style="margin: 10px 0;"></div>
            <el-input placeholder="Password" v-model="form.password" show-password></el-input>
            <div style="margin: 10px 0;"></div>
            <el-button type="primary" :loading="loading" @click="login">Login</el-button>
        </el-col>
    </el-row>
</template>

<style scoped>
    p {
        text-align: center;
        font-size: 40px;
        padding: 20px;
    }

    .el-col-offset-8 {
        margin-top: calc(50vh - 200px);
    }
</style>

<script>
    // Get Data Mixin
    import getData from '@/mixins/getData'

    export default {
        middleware: 'checkLoginPage',
        mixins: [getData],
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                this.asyncGetData({
                    method: 'POST',
                    url: 'login',
                    data: this.form
                }).then(response => {
                    // Save Token
                    this.$store.dispatch('setAccessToken', response.data.token.access_token)
                    // Redirect To Dashboard Page
                    this.$router.push('/dashboard')
                })
            }
        }
    }
</script>
