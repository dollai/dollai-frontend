import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import ko from 'vee-validate/dist/locale/ko.json';

localize('ko', ko);

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...(rules as any)[rule],
    message: (ko.messages as any)[rule],
  });
});

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,}$/;

extend('password', {
  validate: (value: string) => regexPassword.test(value),
  message: '비밀번호는 영대소문자와 숫자, 특수기호(#, $, @, !, %, &, *) 하나 이상 조합한 6자리 이상이어야 합니다.',
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
