<template>
    <div>
        <el-form :model="form" ref="createRole" status-icon label-width="120px">
            <el-input type="text" placeholder="Name" v-model="form.name"></el-input>
            <div style="margin: 10px 0;"></div>
            <el-button type="primary" :loading="loading" @click="submitForm('createRole')">Create</el-button>
            <el-button @click="resetForm('createRole')">Reset</el-button>
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
                    method: 'POST',
                    url: 'create/role',
                    data: this.form
                }).then(response => {
                    // Check Status
                    if (response.status) {
                        // Flash Success Message
                        this.$message({
                            showClose: true,
                            message: 'Role successfully Created',
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
        }
    }
</script>