import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zh from '../assets/locales/zh'
import en from '../assets/locales/en'
import ko from '../assets/locales/ko'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import koLocale from 'element-ui/lib/locale/lang/ko'
Vue.use(VueI18n);

const locals = {
  zh: Object.assign(zh, zhLocale), // 中文
  en: Object.assign(en, enLocale), // 英文
  ko: Object.assign(ko, koLocale) // 英文
}

var lang = navigator.language || navigator.userLanguage; // 常规浏览器语言和IE浏览器
var language = 'en'
lang = lang.substr(0, 2); // 截取lang前2位字符
console.log('获取浏览器默认语言', lang)
if (lang === 'zh') {
  language = 'zh';
} else {
  language = 'en';
}
language = localStorage.getItem('$i18n') ? localStorage.getItem('$i18n') : language

const i18n = new VueI18n({
  locale: language, // set locale
  messages: locals // set locale messages
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

// new Vue({ i18n }).$mount('#app')

export default i18n
