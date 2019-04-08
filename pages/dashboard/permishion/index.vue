<template>
    <div>

        <div class="top-section">
            <el-button
                    v-if="$store.getters.ckeckPermission('create permission')"
                    type="success"
                    @click="createPermissionForm"
            >Create Permission</el-button>
            <div style="margin: 20px 0;"></div>
        </div>

        <el-table
                v-if="$store.getters.ckeckPermission('browse permission')"
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
                    width="280"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Created At"
                    width="280"
                    prop="created_at">
            </el-table-column>
            <el-table-column
                    label="Operations">
                <template slot-scope="scope">
                    <el-button
                            v-if="$store.getters.ckeckPermission('edit permission')"
                            size="mini"
                            @click="editPermissionForm(scope.row)">Edit</el-button>
                    <el-button
                            v-if="$store.getters.ckeckPermission('delete permission')"
                            size="mini"
                            type="danger"
                            @click="deletePermission(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="'Permission ' + permissionAction.action" :visible.sync="openPermissionForm">
            <el-form :model="form">
                <el-form-item label="Permission name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="openPermissionForm = false">Cancel</el-button>
                <el-button type="primary" :loading="loading" @click="confirmPermission">{{ permissionAction.action }}</el-button>
            </span>
        </el-dialog>
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
        data() {
            return {
                loading: false,
                openPermissionForm: false,
                permissionAction: [], // 0 = "Create Permission", 1 = "Edit Permission"
                form: {
                    id: 0,
                    name: ''
                }
            }
        },
        methods: {
            editPermissionForm(row) {
                // Set From ID (Permission ID)
                this.form.id = row.id
                // Set From Name (Permission Name)
                this.form.name = row.name
                // Set Permission Actiuon
                this.permissionAction = {
                    action: 'Edit',
                    method: 'PUT',
                    url: 'edit/permission',
                    message: 'Permission successfully changed'
                }
                // Open Permission Form
                this.openPermissionForm = true
            },
            createPermissionForm() {
                // Clear Form
                this.form = {
                    id: 0,
                    name: ''
                }
                // Set Permission Actiuon
                this.permissionAction = {
                    action: 'Create',
                    method: 'POST',
                    url: 'create/permission',
                    message: 'Permission successfully Created'
                }
                // Open Permission Form
                this.openPermissionForm = true
            },
            confirmPermission() {
                // Start Loading
                this.loading = true;
                // Edit Permision
                this.asyncGetData({
                    token: true,
                    method: this.permissionAction.method,
                    url: this.permissionAction.url,
                    data: this.form
                }).then(response => {
                    // Check Status
                    if (response.status) {
                        // Flash Success Message
                        this.$message({
                            showClose: true,
                            message: this.permissionAction.message,
                            type: 'success'
                        });
                        // Get New Permission List
                        this.tableData = response.data
                        // Close Permission Form
                        this.openPermissionForm = false
                        // Stop Loading
                        this.loading = false;
                    }
                })
            },
            deletePermission(row) {
                // Open Warning Pop Up
                this.$confirm('Do you really want to delete this Permission?', 'Warning', {
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true
                }).then(() => {
                    // If User Enter "Delete" Then Send Delete Request To The Server
                    this.asyncGetData({
                        token: true,
                        method: 'DELETE',
                        url: 'delete/permission/' + row.id
                    }).then(response => {
                        // If User Delete Successfully Then Flash Success Message
                        this.$message({
                            type: 'success',
                            message: 'Permission Deleted Successfully'
                        })
                        // Get New Table List
                        this.tableData = response.data
                    })
                }).catch(() => {
                    // If User Enter "Cancel" Then Flash Success Message
                    this.$message({
                        type: 'success',
                        message: 'Delete canceled'
                    })
                })
            }
        },
        mounted() {
            if (this.$store.getters.ckeckPermission('browse permission')) {
                // Get Permission List
                this.getTableData({
                    token: true,
                    method: 'GET',
                    url: 'get/permission/list',
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
