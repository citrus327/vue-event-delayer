import EventDelayer from '@/components/EventDelayer'

export default {
  version: '0.0.1',
  install: function (Vue) {
    Vue.component('EventDelayer', EventDelayer)
  }
}