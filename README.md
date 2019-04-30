# vue-event-delayer

## Description:
A event delayer serves as component.

## Inspiration
I need a undo functionality, which can be integrated into our project with minimum effort.

For example, we have a todo module, user can remove todo, but it will have 5 seconds
to undo the remove action. 
And suppose we have other five modules that need this undo functionality, and each module has
its own undo state ui design.

The delay part is easy, a setTimeout function will do the job, but it needs to be handled in 
a clean and managable way.

This component is my solution to it.

## Installation
```bash
  npm install vue-event-delayer --save
```

You can import the library and use it as a plugin.

## Basic Usage
```javascript
<template>
  <div id="app">
    <EventDelayer 
      :delay="5000" 
      ref="event-delayer" 
      slot-scope="{ registerAndExecute }">
      <div v-for="todo in todoList" :key="todo.id">
        <span>{{ todo.name }}</span>
        <button @click="registerAndExecute(removeTodo)">Remove Todo</button>
      </div>
    </EventDelayer>
  </div>
</template>

<script>
export default {
  name: 'todo',
  data () {
    return {
      todoList: [{}, {}, {}] // list of todo's 
    }
  },
  methods: {
    removeTodo () {
      // this function need to return a Promise
    }
  }
}
</script>
```
