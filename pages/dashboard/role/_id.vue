<template>
    <div>
        <el-form :model="form" ref="editRole" status-icon label-width="120px">
            <el-input type="text" placeholder="Name" v-model="form.name"></el-input>
            <div style="margin: 10px 0;"></div>
            <el-button type="primary" :loading="loading" @click="submitForm('editRole')">Edit</el-button>
            <el-button @click="resetForm('editRole')">Reset</el-button>
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
        data() {
            return {
                form: {
                    name: '',
                    permission: []
                },
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.form['permission'] = this.$refs.tree.getCheckedNodes()
                this.asyncGetData({
                    token: true,
                    method: 'PUT',
                    url: 'edit/role',
                    data: this.form
                }).then(response => {
                    // Check Status
                    if (response.status) {
                        // Flash Success Message
                        this.$message({
                            showClose: true,
                            message: 'Role successfully changed',
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
            // Get Role Info
            this.asyncGetData({
                token: true,
                method: 'GET',
                url: 'get/role/' + this.$route.params.id
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
                    url: 'get/role/permission/' + this.$route.params.id,
                }).then(response => {
                    this.$refs.tree.setCheckedNodes(response.data)
                })
            })
        }
    }
</script>