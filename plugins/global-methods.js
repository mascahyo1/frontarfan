// plugins/global-methods.js
import Vue from 'vue'

Vue.prototype.$animateCard = function (card) {
  card.classList.add('animate__animated', 'animate__fadeInUp')
}