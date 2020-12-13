<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../../assets/images/head.jpg" alt="" />
        <span>shopManagement</span>
      </div>
      <el-button @click="exit" type="info">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isFold?'64px':'200px'">
        <div class="toggle-btn" @click="foldMenu">
          |||
        </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          unique-opened
          :collapse="isFold"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
        <!-- 一级菜单 -->
          <el-submenu :index="item.id.toString()" v-for="item in menulist" :key="item.index">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item 
            :index="'/'+ subItem.path" 
            v-for="subItem in item.children" 
            :key="subItem.index"
            @click="saveNaveState('/'+ subItem.path)"
            >
              <i class="el-icon-menu"></i>
              <template slot="title">{{subItem.authName}}</template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist:[],
      iconsObj:{
        '125': 'el-icon-user',
        '103': 'el-icon-thumb',
        '101': 'el-icon-shopping-cart-2',
        '102': 'el-icon-document',
        '145': 'el-icon-s-data'
      },
      isFold: false,  //是否折叠
      activePath: '',  //被激活的地址
    };
  },
  created(){
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    exit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取所有菜单
    async getMenuList(){
      const {data:res} = await this.$http.get('menus');
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      console.log(res); 
    },
    //折叠菜单
    foldMenu(){
      this.isFold = !this.isFold;
    },
    //保存链接激活状态
    saveNaveState(address){
      window.sessionStorage.setItem('activePath',address);
      this.activePath = address;
    }
  },
};
</script>

<style lang="scss" scoped>
.home_container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  background: #373d41;
  padding-left: 5px;
  align-items: center;

  div {
    font-size: 20px;
    font-weight: bold;
    color: #fff;

    img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
      border-radius: 50%;
      border: 1px solid #eee;
    }

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background: #333744;

  .toggle-btn {
    background: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: .3em;
    cursor: pointer;
  }

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background: #eaedf1;
}
</style>