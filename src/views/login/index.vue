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
                   @click.native.prevent="handleLogin">Sign in</el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: 123456</span>
      </div>
    </el-form>
    <el-form v-show="signUpStatus"
             ref="signUpForm"
             :model="signUpForm"
             :rules="signUpRules"
             class="sign-form"
             auto-complete="on"
             label-position="left"
             size="small">
      <h3 class="title">407Lab</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="signUpForm.username"
                  name="username"
                  type="text"
                  auto-complete="on"
                  placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>

        <el-input v-model="signUpForm.password"
                  name="password"
                  type="password"
                  auto-complete="on"
                  placeholder="密码" />
      </el-form-item>
      <el-form-item prop="confirmpwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>

        <el-input v-model="signUpForm.confirmpwd"
                  name="confirmpwd"
                  type="password"
                  auto-complete="on"
                  placeholder="确认密码" />
      </el-form-item>
      <el-form-item prop="specialities">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-select v-model="signUpForm.specialities"
                   clearable
                   placeholder="请选择专业">
          <el-option v-for="item in dataJson.loginSpecialities"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="grade">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-select v-model="signUpForm.grade"
                   clearable
                   placeholder="请选择年级">
          <el-option v-for="item in dataJson.loginGrade"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="lab">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-select v-model="signUpForm.lab"
                   clearable
                   placeholder="请选择实验室">
          <el-option v-for="item in dataJson.loginLab"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="skills">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <!-- <span class="svg-container"> -->
        <!-- <svg-icon icon-class="cpu" /> -->
        <!-- <i class="el-icon-cpu" /> -->
        <!-- </span> -->
        <el-select v-model="signUpForm.skills"
                   clearable
                   placeholder="请选择你的技能">
          <el-option v-for="item in dataJson.loginSkills"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"
                   type="primary"
                   style="width:100%;"
                   @click.native.prevent="handleSignUp">Sign up</el-button>
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
      // el-表单注册验证规则
      signUpRules: {
        username: [],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      // 注册表单数据
      signUpForm: {
        username: "",
        password: "",
        confirmpwd: "", // 确认密码
        specialities: "", // 专业
        grade: "", // 年级
        lab: "",
        skills: "" // 技能  -- 软件、硬件、
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
  mounted() {
    // getUserList().then(res => {
    //   console.log(res, "user list");
    // });
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
    },
    /**
     * @description 注册按键事件
     */
    handleSignUp() {
      this.loading = true;
      // 验证 --> 拼装请求参数并请求 --> 提示注册返回消息
      console.log("注册！！", this.signUpForm);

      this.$store
        .dispatch("Register", this.signUpForm)
        .then(res => {
          console.log("注册的数据", res);
          if (res.data.code === 200) {
            this.$notify({
              message: "注册成功~",
              type: "success"
            });
            this.loading = false;
            setTimeout(() => {
              this.signInSwitchHandle();
            }, 1000);
            // this.signInSwitchHandle(); // 切换回登陆界面
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
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
    margin: 80px auto;
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
    margin: 10px auto;
  }
}
</style>
