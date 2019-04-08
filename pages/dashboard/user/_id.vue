<template>
    <div>
        <el-form :model="form" ref="userEdit" status-icon label-width="120px">
            <el-input type="text" placeholder="Name" v-model="form.name"></el-input>
            <div style="margin: 10px 0;"></div>
            <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
            <div style="margin: 10px 0;"></div>
            <el-input type="password" placeholder="Password" show-password v-model="form.password"></el-input>
            <div style="margin: 10px 0;"></div>
            <el-button type="primary" :loading="loading" @click="submitForm">Edit</el-button>
            <el-button @click="resetForm('userEdit')">Reset</el-button>
            <div style="margin: 10px 0;"></div>
        </el-form>

        <el-tree
                :data="data"
                v-loading="loading"
                node-key="id"
                default-expand-all
                show-checkbox
                ref="tree">
        </el-tree>
    </div>
</template>

<script>
    // Get Data Mixin
    import getData from '@/mixins/getData'

    export default {
        middleware: 'auth',
        layout: 'dashboard',
        mixins: [getData],
        validate ({ params }) {
            // Must be a number
            return /^\d+$/.test(params.id)
        },
        data() {
            return {
                labelPosition: 'right',
                form: {
                    id: this.$route.params.id,
                    name: '',
                    email: '',
                    password: '',
                    permission: []
                },
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        mounted() {
            // Get User Info
            this.asyncGetData({
                token: true,
                method: 'GET',
                url: 'get/user/' + this.$route.params.id
            }).then(response => {
                if (response.status) this.form = response.data
            })

            // Get Permission List
            this.asyncGetData({
                token: true,
                method: 'GET',
                url: 'get/permission/tree/list',
            }).then(response => {
                // Get Permission List
                this.data = response.data
                // Get User Permission List
                this.asyncGetData({
                    token: true,
                    method: 'GET',
                    url: 'get/user/permission/' + this.$route.params.id,
                }).then(response => {
                    this.$refs.tree.setCheckedNodes(response.data)
                })
            })
        },
        methods: {
            submitForm() {
                this.form['permission'] = this.$refs.tree.getCheckedNodes()
                this.asyncGetData({
                    token: true,
                    method: 'PUT',
                    url: 'edit/user',
                    data: this.form
                }).then(response => {
                    // Check Status
                    if (response.status) {
                        // Flash Success Message
                        this.$message({
                            showClose: true,
                            message: 'User successfully changed',
                            type: 'success'
                        });
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>