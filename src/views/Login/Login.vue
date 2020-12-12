<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="header">
        <img src="../../assets/images/head.jpg" alt="" />
      </div>
      <div class="form_box">
        <el-form
          :model="loginForm"
          :rules="loginFormRules"
          ref="loginFormRef"
          label-width="0"
          class="login_form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="resetLoginForm" type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: {
        //验证用户名
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //重置按钮
    resetLoginForm() {
      console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    //登录
    login() {
      //valid为是否验证通过
      /*
      this.$refs.loginFormRef.validate((valid) => {
        //   console.log(valid);
        if (!valid) return;
        this.$http.post("login", this.loginForm).then((res) => {
            console.log(res);
        });
      });
      */
        // 另一种方法
        this.$refs.loginFormRef.validate(async (valid) => {
        //   console.log(valid);
        if (!valid) return;
        //解构赋值
        const {data: res} = await this.$http.post("login", this.loginForm);
        console.log(res);
        if(res.meta.status != 200) return this.$message.error('登陆失败');
        this.$message.success('登陆成功');
        /*
        登陆成功之后的token，保存到客户端的sessionStorage 中
        */
       window.sessionStorage.setItem("token",res.data.token);
       this.$router.push('index');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: rgb(57, 99, 141);

  .login_box {
    position: relative;
    width: 500px;
    height: 330px;
    background: #fff;

    .header {
      position: absolute;
      left: 50%;
      top: -50%;
      height: 150px;
      width: 150px;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 50%;
      box-shadow: 0 0 5px rgb(63, 41, 41);
      transform: translate(-50%, 50%);
      background: #fff;
      user-select: none;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }

    .form_box {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      .login_form {
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
      }

      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>