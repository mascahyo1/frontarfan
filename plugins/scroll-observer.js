// plugins/scroll-observer.js
import Vue from 'vue'

Vue.directive('scroll-observer', {
  inserted: (el, binding) => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            binding.value(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1
      }
    )
    observer.observe(el)
  }
})