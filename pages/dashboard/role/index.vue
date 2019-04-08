<template>
    <div>
        <div class="top-section">
            <el-button
                    v-if="$store.getters.ckeckPermission('create role')"
                    type="success"
                    @click="$router.push('/dashboard/role/create')"
            >Create Role</el-button>
            <div style="margin: 20px 0;"></div>
        </div>

        <el-table
                v-if="$store.getters.ckeckPermission('browse role')"
                v-loading="loading"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="ID"
                    width="180"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="Name"
                    width="180"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Created At"
                    width="180"
                    prop="created_at">
            </el-table-column>
            <el-table-column
                    label="Operations">
                <template slot-scope="scope">
                    <el-button
                            v-if="$store.getters.ckeckPermission('edit role')"
                            size="mini"
                            @click="$router.push('/dashboard/role/' + scope.row.id)">Edit</el-button>
                    <el-button
                            v-if="$store.getters.ckeckPermission('delete role')"
                            size="mini"
                            type="danger"
                            @click="deleteRole(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    // Get Table Data Mixin
    import getTableData from '@/mixins/getTableData'
    // Get Data Mixin
    import getData from '@/mixins/getData'

    export default {
        middleware: 'auth',
        layout: 'dashboard',
        mixins: [getTableData, getData],
        mounted() {
            if (this.$store.getters.ckeckPermission('browse role')) {
                // Get User List
                this.getTableData({
                    token: true,
                    method: 'GET',
                    url: 'get/role/list',
                })
            }
        },
        methods: {
            deleteRole(row) {
                // Open Warning Pop Up
                this.$confirm('Do you really want to delete this role?', 'Warning', {
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true
                }).then(() => {
                    // If Role Enter "Delete" Then Send Delete Request To The Server
                    this.asyncGetData({
                        token: true,
                        method: 'DELETE',
                        url: 'delete/role/' + row.id
                    }).then(response => {
                        // Check Status
                        if (response.status) {
                            // If Role Delete Successfully Then Flash Success Message
                            this.$message({
                                type: 'success',
                                message: 'Role Deleted Successfully'
                            })
                            // Get New Table List
                            this.tableData = response.data
                        }
                    }).catch(error => {
                        // If Role Enter "Cancel" Then Flash Success Message
                        this.$message({
                            type: 'danger',
                            message: error.response.data.message
                        })
                    })
                }).catch(() => {
                    // If User Enter "Cancel" Then Flash Success Message
                    this.$message({
                        type: 'success',
                        message: 'Delete canceled'
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .top-section {
        text-align: right;
    }
</style>