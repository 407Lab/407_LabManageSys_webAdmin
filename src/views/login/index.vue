<template>
  <div class="login-container">
    <div class="login-navbar">
      <div class="sign-switch">
        <div style="height: 40px; margin-right: 20px;">
          <el-button type="text"
                     style="color: #ffffff;"
                     @click="signInSwitchHandle()">Sign In</el-button>
        </div>
        <div style="height: 40px;">
          <el-button plain
                     style="backgroundColor: #14191f; color: #ffffff;"
                     @click="signUpSwitchHandle()">Sign Up</el-button>
        </div>
      </div>
    </div>
    <el-form v-show="signInStatus"
             ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             auto-complete="on"
             label-position="left">
      <h3 class="title">407Lab</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username"
                  name="username"
                  type="text"
                  auto-complete="on"
                  placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="pwdType"
                  v-model="loginForm.password"
                  name="password"
                  auto-complete="on"
                  placeholder="password"
                  @keyup.enter.native="handleLogin" />
        <span class="show-pwd"
              @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"
                   type="primary"
                   style="width:100%;"
                   @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: 123456</span>
      </div>
    </el-form>
    <el-form v-show="signUpStatus"
             ref="signUpForm"
             :model="signUpForm"
             :rules="signUpRules"
             class="sign-form"
             auto-complete="on"
             label-position="left">
      <h3 class="title">407Lab</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="signUpFprm.username"
                  name="username"
                  type="text"
                  auto-complete="on"
                  placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>

        <el-input v-model="signUpFprm.password"
                  name="password"
                  type="text"
                  auto-complete="on"
                  placeholder="password" />
      </el-form-item>
      <el-form-item prop="specialities">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-select v-model="signUpFprm.specialities"
                   clearable
                   placeholder="请选择年级">
          <el-option v-for="item in dataJson.loginSpecialities"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from "@/utils/validate";
import dataJson from "./data.json";

export default {
  name: "Login",
  data() {
    // 自定义表单验证
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error("请输入正确的用户名"));
    //   } else {
    //     callback();
    //   }
    // };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      // 登陆表单数据
      loginForm: {
        username: "",
        password: ""
      },
      // el-表单验证规则
      loginRules: {
        username: [
          // { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      // 注册表单数据
      signUpFprm: {
        username: "",
        password: "",
        specialities: "", // 专业
        grade: "", // 年级
        lab: "",
        skills: ""
      },
      // 加载状态标志
      loading: false,
      pwdType: "password",
      redirect: undefined,
      // 登陆、注册按键切换
      signInStatus: true,
      signUpStatus: false,
      dataJson // 数据外部json文件
    };
  },
  watch: {
    $route: {
      // vue-route 这一块看看！！
      handler: function(route) {
        console.log("route", route);
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @description 是否显式的显示密码
     */
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    /**
     * @description 切换登陆账户
     */
    signInSwitchHandle() {
      this.signInStatus = true;
      this.signUpStatus = false;
    },
    /**
     * @description 切换注册账户
     */
    signUpSwitchHandle() {
      this.signInStatus = false;
      this.signUpStatus = true;
    },
    /**
     * @description 登陆按键事件
     */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.error("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-select {
    display: inline-block;
    height: 47px;
    width: 90%;
    .el-input {
      width: 100%;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-navbar {
    width: 100%;
    height: 64px;
    background-color: #14191f;
    .sign-switch {
      display: flex;
      align-items: center;
      float: right;
      width: 200px;
      height: 100%;
    }
  }
  .sign-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
}
</style>
