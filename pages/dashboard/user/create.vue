<template>
    <div>
        <el-form :model="form" ref="createUser" status-icon label-width="120px">
            <el-input type="text" placeholder="Name" v-model="form.name"></el-input>
            <div style="margin: 10px 0;"></div>
            <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
            <div style="margin: 10px 0;"></div>
            <el-input type="password" placeholder="Password" show-password v-model="form.password"></el-input>
            <div style="margin: 10px 0;"></div>
            <el-button type="primary" :loading="loading" @click="submitForm('createUser')">Create</el-button>
            <el-button @click="resetForm('createUser')">Reset</el-button>
            <div style="margin: 10px 0;"></div>
        </el-form>

        <div style="margin: 10px 0;"></div>
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
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    permission: []
                },
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                roles: [],
                rolesValue: []
            };
        },
        methods: {
            submitForm(formName) {
                this.form['permission'] = this.$refs.tree.getCheckedNodes()
                this.asyncGetData({
                    token: true,
                    method: 'POST',
                    url: 'create/user',
                    data: this.form
                }).then(response => {
                    // Check Status
                    if (response.status) {
                        // Flash Success Message
                        this.$message({
                            showClose: true,
                            message: 'User successfully Created',
                            type: 'success'
                        });
                        // Reset Form
                        this.$refs[formName].resetFields();
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            this.asyncGetData({
                token: true,
                method: 'GET',
                url: 'get/permission/tree/list',
            }).then(response => {
                this.data = response.data
            })

            this.asyncGetData({
                token: true,
                method: 'GET',
                url: 'get/role/list',
            }).then(response => {
                this.roles = response.data
            })
        }
    }
</script>