<template>
    <el-tree
            :data="data"
            v-loading="loading"
            node-key="id"
            default-expand-all
            icon-class="el-icon-rank"
            @node-drag-end="handleDragEnd"
            draggable>
    </el-tree>
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
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                this.asyncGetData({
                    token: true,
                    method: 'POST',
                    url: 'change/permission/location',
                    data: {
                        'parent_id': dropNode.data.id,
                        'child_id': draggingNode.data.id,
                        'type': dropType
                    }
                }).then(response => {
                    if (response.status) {
                        this.$message({
                            showClose: true,
                            message: 'Permission locationm successfully changed',
                            type: 'success'
                        })
                    }
                })
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