<template>
  <div class="page min-h-dvh bg-white">
    <t-navbar placeholder @left-click="goBack" @right-click="onHelp">
      <template #left>
        <svg-icon name="back" :size="24" />
      </template>
      <template #right>
        <span class="pr-2 text-sm">遇到问题</span>
      </template>
    </t-navbar>
    <div class="page-content px-6 py-12">
      <div class="login-header">
        <h1 class="text-2xl text-foreground">{{ loginText[loginType].title }}</h1>
        <p class="mt-2 text-[13px] text-foreground-4">{{ loginText[loginType].desc }}</p>
      </div>
      <div class="login-form mt-4">
        <t-input v-model="displayPhone" placeholder="请输入手机号" maxlength="13">
          <template #label>
            <div class="flex items-center">
              <span>+86</span>
              <svg-icon name="down" :size="14" />
            </div>
          </template>
        </t-input>
        <t-input v-show="loginType === 'sms'" v-model="loginData.smsCode" placeholder="请输入验证码" maxlength="4">
          <template #extra>
            <div class="t-input__extra flex items-center gap-3">
              <span class="send-btn text-sm text-brand" :class="{ 'send-btn--disabled': !canSend }" @click="sendCode">
                {{ countdown > 0 ? `重新发送&nbsp;(${countdown}s)` : '获取验证码' }}
              </span>
            </div>
          </template>
        </t-input>
        <t-input v-show="loginType === 'pwd'" v-model="loginData.password" type="password" placeholder="请输入密码" maxlength="12" />
        <t-button class="mt-8" :disabled="!canSubmit" theme="primary" block @click="login">开始探索</t-button>
        <t-checkbox class="mt-4" v-model="agreement" :block="false" borderless contentDisabled>
          <span>已阅读并同意
            <a class="text-foreground">《用户协议》</a>
            <a class="text-foreground">《隐私政策》</a>
            <a class="text-foreground">《买家须知》</a>
          </span>
        </t-checkbox>
      </div>
      <div class="login-toggle mt-12 text-center">
        <span class="toggle-btn text-sm text-foreground" @click="toggleType">
          {{ loginText[loginType].toggle }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import { formatPhone } from '@/utils/format';

const router = useRouter();

const loginText = {
  sms: { title: '手机号登录', desc: '手机号首次验证通过即注册', toggle: '使用密码登录' },
  pwd: { title: '密码登录', desc: '请确保您已经设置登录密码', toggle: '使用验证码登录' },
} as const;

type LoginType = 'sms' | 'pwd';
const loginType = ref<LoginType>('sms');
const loginData = reactive({
  phone: '',
  password: '',
  smsCode: '',
});
const countdown = ref(0);
const agreement = ref(false);

const displayPhone = computed({
  get: () => formatPhone(loginData.phone),
  set: (value: string) => {
    loginData.phone = value.replace(/\s/g, '');
  },
});

const canSend = computed(() =>
  loginData.phone.length === 11 && countdown.value === 0);

const canSubmit = computed(() =>
  loginData.phone.length === 11 && (loginData.smsCode.length === 4 || loginData.password.length >= 6)
);

onUnmounted(() => clearCountdown());

const sendCode = () => {
  if (!canSend.value) return;
  startCountdown(60);
};

const login = () => {
  router.push('/');
};

const goBack = () => {
  router.back();
};

const onHelp = () => {};

const toggleType = () => {
  loginType.value = loginType.value === 'sms' ? 'pwd' : 'sms';
  loginData.smsCode = '';
  loginData.password = '';
};

let timer: number | null = null;

const startCountdown = (seconds: number) => {
  clearCountdown();
  countdown.value = seconds;
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) clearCountdown();
  }, 1000);
};

const clearCountdown = () => {
  if (timer) clearInterval(timer);
  timer = null;
};
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>