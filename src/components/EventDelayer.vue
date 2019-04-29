<script>
export default {
  name: 'EventDelayer',
  props: {
    delay: {
      type: Number,
      required: false,
      default: () => 5000
    }
  },
  data () {
    return {
      tasks: []
    }
  },
  render (h) {
    return h('div', {
      class: 'undo-wrapper',
    },this.$scopedSlots.default({
      isTaskPending: this.isTaskPending,
      registerAndExecute: this.registerAndExecute,
      cancel: this.cancel
    }))
  },
  methods: {
    isTaskPending (key) {
      let task = this.findTask(key)
      return Boolean(task && task.pending)
    },
    findTask (key) {
      return this.tasks[this.findTaskIndex(key)]
    },
    findTaskIndex (key) {
      return this.tasks.findIndex((o) => {
        return o.key === key
      })
    },
    register (handler, key) {
      if (this.findTaskIndex(key) === -1) {
        this.tasks.push({
          handler,
          key
        })
      }
    },
    cancel (key) {
      clearTimeout(this.findTask(key).timer)
      this.flush(key)
    },
    cancelAll (key) {
      this.tasks.forEach((t) => {
        clearTimeout(t.timer)
        this.flush(t.key)
      })
    },
    execute (key) {
      let promisedTask = new Promise((resolve, reject) => {
        let task = this.findTask(key)
        let timer = setTimeout(() => {
          task.handler().then(() => {
            resolve()
          }).catch((e) => {
            reject(e)
          })
        }, this.delay)
        task.timer = timer
        task.pending = true
      })

      promisedTask.then(() => {
        this.tasks.splice(this.findTaskIndex(key), 1)
      }).catch(() => {
        // do nothing
      })
    },
    executeAll () {
      if (this.tasks.length === 0) {
        return 
      }
      const promisedTasks = this.tasks.map((t) => {
        return new Promise((resolve, reject) => {
          try {
            t.handler().then(() => {
              resolve()
            }).catch((e) => {
              reject(e)
            })
          }
          catch(e) {
            reject(e)
          }
        })
      })
      Promise.all(promisedTasks)
    },
    flush (key) {
      let index = this.findTaskIndex(key)
      if (index !== -1) {
        this.tasks.splice(index, 1)
      }
    },
    flushAll () {
      this.tasks = []
    },
    registerAndExecute (handler, key) {
      this.register(handler, key)
      this.execute(key)
    }
  }
}
</script>