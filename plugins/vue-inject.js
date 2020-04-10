import Vue from 'vue'
import sanitizeHtml from 'sanitize-html'

/**
 * @link https://github.com/vuejs/vue/issues/6333
 */
Vue.prototype.$sanitize = sanitizeHtml
