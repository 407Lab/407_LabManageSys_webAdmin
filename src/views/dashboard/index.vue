<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">
      roles:
      <span v-for="role in roles" :key="role">{{ role }}</span>
    </div>
    <img
      src="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"
      alt="hello"
      class="wel-gif"
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["name", "roles"])
  },
  mounted() {
    console.log("路由", this.$route);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    padding: 40px 40px;
    background-color: #e3e3e3;
    min-height: 100vh;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.wel-gif {
  display: block;
  margin: 0 auto;
  width: 50%;
}
</style>
