<template>
  <div>
      <el-button @click="exit">退出</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    exit(){
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>