<template>
  <div class="guide flex column">
    <div class="blur col flex items-center justify-center">
      <div class="text-center">
        <div class="text-h2  text-white text-weight-bolder">享受音乐之美</div>
        <div class="text-h6 text-white q-my-md">基于网易云api制作</div>
        <q-btn
          class="q-mt-lg text-white"
          outline
          @click.stop="loginDialog = true"
          >探索
        </q-btn>
      </div>
      <!--登陆对话框-->
      <q-dialog
        v-model="loginDialog"
        transition-show="slide-up"
        transition-hide="slide-up"
      >
        <q-card class="col-6">
          <div class="flex">
            <!--左侧插画展示-->
            <div class="left"></div>
            <!--右侧登陆功能-->
            <div class="q-px-md">
              <div class="q-mx-md q-mt-lg text-h6 text-primary">MD音乐</div>
              <div class="q-mx-md text-subtitle2 text-primary">欢迎回来!</div>
              <!--表单-->
              <q-form class="column q-mx-md" ref="form">
                <q-input
                  class="q-mt-md"
                  v-model="phone"
                  label="手机号"
                  type="tel"
                  lazy-rules
                  :rules="[
                    val => (val && val.length === 11) || '手机号格式不正确！'
                  ]"
                  counter
                  maxlength="11"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-cellphone" color="secondary" />
                  </template>
                </q-input>
                <q-input
                  v-model="password"
                  label="密码"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '密码不能为空！']"
                  counter
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-lock-question" color="secondary" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                      color="secondary"
                    />
                  </template>
                </q-input>
                <q-btn
                  class="self-stretch q-mt-lg"
                  color="secondary"
                  label="登陆"
                  type="submit"
                  @click="login"
                />
                <q-btn
                  class="self-stretch q-mt-lg"
                  color="primary"
                  label="注册"
                  flat
                  disable
                />
              </q-form>
            </div>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { apiLogin } from "../api/api";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "PageIndex",
  data() {
    return {
      loginDialog: false,
      phone: "",
      password: "",
      isPwd: true
    };
  },
  methods: {
    ...mapMutations(["updateUserId"]),
    async login() {
      let state = await this.$refs.form.validate();
      if (state) {
        let {
          account: { id }
        } = await apiLogin(this.phone, this.password);
        this.updateUserId(id);
        await this.$router.replace({
          path: "/music/home"
        });
        this.$q.notify({
          position: "top",
          color: "green-1",
          textColor: "positive",
          message: "欢迎回来！",
          icon: "fas fa-check"
        });
      }
    }
  }
});
</script>
<style type="scss">
.guide {
  font-family: "Josefin Sans", -apple-system, "PingFang SC", "Hiragino Sans GB",
    "Microsoft Yahei", "WenQuanYi Micro Hei", "ST Heiti", sans-serif;
  background-image: url("../statics/back.jpg");
  background-size: cover;
  height: 100vh;
}
.blur {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.left {
  width: 30vw;
  min-height: 50vh;
  background-image: url("../assets/bg-left.jpg");
  background-size: cover;
}
</style>
