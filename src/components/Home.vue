<template>
  <div class="basic-layout">
    <div :class="['nav-side', iscollapse ? 'fold' : 'unfold']">
      <!-- 导航logo -->
      <div class="logo">
        <img src="../assets/logo.png" alt="" class="logo">
      </div>
      <!-- 导航菜单 -->
      <el-menu class="nav-menu" router :collapse="iscollapse" :default-active="activeMenu" active-text-color="#3c9566">
        <tree-menu :userMenu="menuList"></tree-menu>

      </el-menu>


    </div>
    <div :class="['content-right', iscollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="menu-fold">
          <el-icon size="25px" class="fold" @click="toggle">
            <Fold />
          </el-icon>
          <div class="bread">
            <bread-cup></bread-cup>
          </div>
        </div>

        <div class="user-info">
          <el-badge :is-dot="noticeCount > 0 ? true : false" class="notice" @click="$router.push('/audit/approve')">
            <el-icon>
              <Bell />
            </el-icon>
          </el-badge>

          <el-dropdown @command="handleout">
            <span class="user-link">
              {{ userInfo.userName }}

              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="person">个人中心</el-dropdown-item>
                <el-dropdown-item command="out">退出</el-dropdown-item>

              </el-dropdown-menu>
            </template>
          </el-dropdown>


        </div>

      </div>
      <div class="wrapper">

        <router-view></router-view>

      </div>
    </div>
  </div>


</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { notCount, getMenuListAPI, getPermissionListAPI } from '../api/index'
import TreeMenu from './TreeMenu.vue'
import BreadCup from './BreadCup.vue'

export default {
  data() {
    return {
      iscollapse: false,
      noticeCount: 0,
      menuList: [],
      activeMenu: location.hash.slice(1),
      userInfo: {}
    };
  },
  computed: {
    ...mapState("m_user", ["userInfo"]),
    noticeCount() {
      return this.userInfo.noticeCount
    }

  },
  mounted() {
    this.getNotCount();
    this.getMenuList()
    this.userInfo = this.$store.state.m_user.userInfo
    // console.log(this.userInfo);
  },
  methods: {
    ...mapMutations("m_user", ["setUser", "setMenuLIst", "setActionList", "setNoticeCount"]),
    handleout(key) {
      if (key === "out") {
        this.setUser("");
        this.userInfo = "";
        this.$router.push("/login");
      }
      else if (key === "person") {
        return;
      }
    },
    toggle() {
      this.iscollapse = !this.iscollapse;
    },
    async getNotCount() {
      const res = await notCount();
      this.setNoticeCount(res)

      console.log(this.userInfo);
    },
    async getMenuList() {
      const { menuList, actionList } = await getPermissionListAPI();
      this.menuList = menuList;
      // console.log(this.menuList);
      this.setMenuLIst(menuList)
      this.setActionList(actionList)
    }
  },
  components: { TreeMenu, BreadCup, BreadCup }
}
</script>

<style lang="scss">
.basic-layout {
  position: relative;

  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #3c9566;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;

    .logo {
      width: 200px;
      height: 100px;
    }

    .nav-menu {
      background-color: transparent;
      border-right: none;

    }

    &.fold {
      width: 64px;
    }

    &.unfold {
      width: 200px;
    }

  }

  .content-right {
    margin-left: 200px;
    transition: margin 0.5s;


    &.fold {
      margin-left: 64px;
    }

    &.unfold {
      margin-left: 200px;

    }

    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;

      .menu-fold {
        display: flex;
        align-items: center;

        .fold {
          cursor: pointer;
          color: #3c9566;

        }

        .bread {
          margin-left: 10px;
        }

      }



      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 10px;
          color: #3c9566;
          cursor: pointer;

        }

        .user-link {
          margin-top: 15px;
          cursor: pointer;
          color: #3c9566;
        }
      }

    }

    ;

    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);

      .main-page {
        height: 100%;
        background: #fff;
      }

    }

  }
}
</style>