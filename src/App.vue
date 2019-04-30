<template>
  <div id="app">
    <div class="main">
      <div>
        <label>Delay:</label>
        <span>
          <input type="number" v-model.number="delay"/>
        </span>
      </div>

      <div style="margin-top: 50px">
        <label>Current Count:</label>
        <span> {{ count }} </span>
      </div>
    </div>

    <EventDelayer :delay="delay" ref="event-delayer">
      <button @click="addTask()">
        Add Task
      </button>
    </EventDelayer>
  </div>
</template>

<script>
import EventDelayer from '@/components/EventDelayer'
export default {
  name: 'app',
  components: {
    EventDelayer
  },
  data () {
    return {
      delay: 5000,
      count: 0,
      taskId: 0
    }
  },
  methods: {
    addTask() {
      this.$refs['event-delayer'].registerAndExecute(() => {
        return new Promise((resolve) => {
          this.count++
          resolve()
        })
      }, this.taskId)
      this.taskId++
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 300px;
  margin: 60px auto;
  text-align: left;
}
</style>
