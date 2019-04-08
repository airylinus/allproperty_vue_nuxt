<template>
    <el-menu :default-openeds="['1', '2', '3']">
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-service"></i>User</template>
            <nuxt-link to="/dashboard"><el-menu-item index="1-1">User List</el-menu-item></nuxt-link>
            <nuxt-link to="/dashboard/user/create"><el-menu-item index="1-2">Create User</el-menu-item></nuxt-link>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-service"></i>Permishion</template>
            <nuxt-link to="/dashboard/permishion"><el-menu-item index="2-1">Permishion List</el-menu-item></nuxt-link>
            <nuxt-link to="/dashboard/permishion/tree"><el-menu-item index="2-2">Permishion Tree</el-menu-item></nuxt-link>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-rank"></i>Role</template>
            <nuxt-link to="/dashboard/role"><el-menu-item index="3-1">Role List</el-menu-item></nuxt-link>
            <nuxt-link to="/dashboard/role/create"><el-menu-item index="3-2">Create Role</el-menu-item></nuxt-link>
        </el-submenu>
    </el-menu>
</template>

<style scoped>
    a {
        text-decoration: none
    }

    .el-menu {
        border-right: none
    }
</style>