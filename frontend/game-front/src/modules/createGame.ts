interface MoveCommand {
  playerId: string;
  keyPressed: any;
}

interface Coordinates {
  x: number;
  y: number;
}

interface Players {
  [key: string]: Coordinates
}

interface KeyPressed {
  'ArrowUp': any;
  'ArrowRight': any;
  'ArrowDown': any;
  'ArrowLeft': any;
}

type PlayersIndex = keyof Players;
type KeyIndex = keyof KeyPressed;

interface Fruits {
  [key: string]: Coordinates
}

interface Bot {
  [key: string]: Coordinates
}

type FruitsIndex = keyof Fruits;
type BotIndex = keyof Bot;

interface State {
  players: Players;
  fruits: Fruits;
  bot: Bot,
  screen: any;
  points: any;
}


export default function createGame() {


  const state: State = {
    players: {
      'Bob': { x: (window.screen.width / 2 - 100), y: window.screen.height / 2 - 100 }
    },

    bot: {
      'Orc': { x: Math.floor(Math.random() * (0 - 1850) + 1850), y: Math.floor(Math.random() * (0 - 1000) + 1000) }
    },

    fruits: {
      'fruit': { x: Math.floor(Math.random() * (0 - 1850) + 1850), y: Math.floor(Math.random() * (0 - 1000) + 1000) }
    },

    screen: {
      width: window.screen.width,
      height: window.screen.height

    },
    points: {
      'Points': 0
    }
    
  }

  function addPlayer(command: any) {
    const playerId = command.playerId;
    const playerX = command.playerX;
    const playerY = command.playerY;

    state.players[playerId as PlayersIndex] = {
      x: playerX,
      y: playerY
    }
  }

  function removePlayer(command: MoveCommand) {
    const playerId = command.playerId

    delete state.players[playerId as PlayersIndex]
  }

  function addFruit(command: any) {
    const fruitId = command.fruitId;
    const fruitX = command.fruitX;
    const fruitY = command.fruitY;

    state.fruits[fruitId as FruitsIndex] = {
      x: fruitX,
      y: fruitY
    }
  }

  function addBot(command: any) {
    const botId = command.botId;
    const botX = command.botX;
    const botY = command.botY;

    state.bot[botId as BotIndex] = {
      x: botX,
      y: botY
    }
  }

  function removeFruit(command: any) {
    const fruitId = command.fruitId

    delete state.fruits[fruitId as FruitsIndex]
  }

  var vx = 10;
  var vy = 10;


  function moveBot() {
    const bot = state.bot['Orc'];
  
    if (bot.x < 0){
      vx = -vx;
    }
    if (bot.x > state.screen.width -100){
      vx = -vx;
    }
    if (bot.y < 0){
      vy = -vy;
    }
    if (bot.y > state.screen.height -100){
      vy = -vy;
    }

    bot.x += vx;
    bot.y += vy;
    
  }



  function movePlayer(command: MoveCommand) {
    const accepetdMoves: KeyPressed = {
      ArrowUp(player: any) {
        if (player.y - 1 >= 10) {
          player.y -= 20
        }
      },
      ArrowRight(player: any) {
        if (player.x + 1 < state.screen.width - 98) {
          player.x += 20
        }
      },
      ArrowDown(player: any) {
        if (player.y + 1 < state.screen.height - 150) {
          player.y += 20
        }
      },
      ArrowLeft(player: any) {
        if (player.x - 1 >= 10) {
          player.x -= 20
        }
      }
    }

    const checkForCollision = () => {
      const player = state.players[playerId]



      for (const fruitId in state.fruits) {
        const fruit = state.fruits[fruitId as FruitsIndex]

        const playerCenterX = player.x + 50;
        const playerCenterY = player.y + 75;

        const fruitCenterX = fruit.x + 50;
        const fruitCenterY = fruit.y + 50;

        const botCenterX = bot.x + 50;
        const botCenterY = bot.y + 50;

        var catFruitX = playerCenterX - fruitCenterX;
        var catFruitY = playerCenterY - fruitCenterY;

        var catBotX = playerCenterX - botCenterX;
        var catBotY = playerCenterY - botCenterY;

        var sumX = 50 + 50;
        var sumY = 75 + 50;

        if (Math.abs(catFruitX) < sumX && Math.abs(catFruitY) < sumY) {

          state.points['Points']++ 

          console.log(state.points['Points'])

          removeFruit({ fruitId: fruitId })

          state.fruits['fruit'] = {
            x: Math.floor(Math.random() * (0 - 1900) + 1900),
            y: Math.floor(Math.random() * (0 - 1000) + 1000)
          }

        }

        if (Math.abs(catBotX) < sumX && Math.abs(catBotY) < sumY) {
          alert(`VOCÊ PERDEU!! Sua Pontuação foi: ${state.points['Points']}`)

          state.points['Points'] = 0;

          console.log("LOST")
        }

      }




    }
    const keyPressed = command.keyPressed;
    const playerId = command.playerId;
    const bot = state.bot['Orc']
    const player = state.players[command.playerId as PlayersIndex]
    const moveFunction = accepetdMoves[keyPressed as KeyIndex]

    if (player && moveFunction) {
      moveFunction(player)
      checkForCollision()
    }

  }

  return {
    addFruit,
    removeFruit,
    addPlayer,
    removePlayer,
    movePlayer,
    addBot,
    moveBot,
    state
  }

}