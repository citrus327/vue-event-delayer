<template>
  <div id="app">
    <div>
      <label>Current Count:</label>
      <span> {{ count }} </span>
    </div>
    
    <EventDelayer :delay="1000" ref="event-delayer">
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
      tasks: [],
      count: 0,
    }
  },
  methods: {
    addTask() {
      this.$refs['event-delayer'].registerAndExecute(() => {
        return new Promise((resolve) => {
          this.count++
          resolve()
        })
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
