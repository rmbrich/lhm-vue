<template>
  <div>
    <div>
      <p><img v-bind:src="room.image"></p>
      <p v-if="message"><h3>{{ message }}</h3></p>
      <p><h3>{{ room.desc }}</h3></p>
    </div>
    <div>
      <p><button v-for="btn in room.buttons" v-on:click="btnClick(btn.next, btn.action)">{{btn.text}}</button></p>
    </div>
    <div>
      <p>You have <b>{{ things.money }}</b> money</p>
      <p v-if="things.upstairsKey">You have an upstairs key</p>
    </div>
  </div>
</template>

<script>
let things = {
  money: 0,
  upstairsKey: false
}
import roomsFunc from './rooms'
const rooms = roomsFunc(things)

export default {
  name: "App",
  components: {},
  data: function() {
    return {
      room: rooms.main,
      things: things,
      message: null
    }
  },
  methods: {
    btnClick(room) {
      console.log(room)
      let message = null
      let canEnter = true
      let goTo
      if (typeof rooms[room].enter === 'function') {
        let result = rooms[room].enter()
        if (result && result.message) message = result.message
        if (result && result.goTo) goTo = result.goTo
        if (result && result.canEnter === false) canEnter = false
      }
      this.message = message
      if (goTo) {
        this.room = rooms[goTo]
      } else if (canEnter) {
        this.room = rooms[room]
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app button {
  margin-right: 5px;
}
#app img {
  width: 800px;
}
</style>
