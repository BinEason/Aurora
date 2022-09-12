<template>
    <template v-for="menu in userMenu">
        <el-sub-menu v-if="
            menu.children &&
            menu.children.length > 0 &&
            menu.children[0].menuType == 1
        " :key="menu._id" :index="menu.path">
            <template #title>
                <component :is="menu.icon" style="width: 20px; height:18px; margin-right: 5px;" />
                <span>{{ menu.menuName }}</span>

            </template>
            <tree-menu :userMenu="menu.children" />
        </el-sub-menu>
        <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path" :key="menu._id + 1">
            {{ menu.menuName }}
        </el-menu-item>
    </template>
</template>
<script>
export default {
    name: "TreeMenu",
    props: {
        userMenu: {
            type: Array,
            default() {
                return [];
            },
        },
    },

};
</script>

<style>

</style>