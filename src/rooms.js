module.exports = function(things) {
  return {
  main: {
    image: "main.jpg",
    desc: "You are in the main room. You see stairs with a door at the top. It is locked. You need to find the key.",
    buttons: [
      {text: "go find the key", next: "office"},
      {text: "explore the basement", next: "basement"},
      {text: "go upstairs", next: "upstairs"}
    ]
  },
  office: {
    image: "office.jpg",
    desc: "You see a desk. A key is on the shelf.",
    buttons: [
      {text: "grab the key", next: "getKey"},
      {text: "back to main room", next: "main"}
    ]
  },
  getKey: {
    enter: () => {
      things.upstairsKey = true
      return {message: "The key glows!", goTo: "main"}
    }
  },
  upstairs: {
    image: "upstairs.jpg",
    enter: () => {
      if (!things.upstairsKey) {
        return {canEnter: false, message: "You don't have the key!"}
      }
    },
    desc: "You enter a large room and see a painting of E. Gad",
    buttons: [
      {text: "(this room isn't finished)", next: "upstairs"},
      {text: "back to main room", next: "main"}
    ]
  },
  basement: {
    image: "basement.jpg",
    desc: "You enter the basement and see a ghost!",
    buttons: [
      {text: "suck it up", next: "ghost"},
      {text: "run away", next: "main"}
    ]
  },
  ghost: {
    enter: () => {
      things.money += 3
      return {message: "You suck up the ghost and dollars fall out. You suck them up and get 3 dollars!", goTo: "basement"}
    }
  }
}
}