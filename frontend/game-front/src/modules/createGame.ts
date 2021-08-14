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

interface Chests {
  [key: string]: Coordinates
}

interface Bot {
  [key: string]: Coordinates
}

type ChestsIndex = keyof Chests;
type BotIndex = keyof Bot;

interface State {
  players: Players;
  chests: Chests;
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
      'Orc': { x: Math.floor(Math.random() * (0 - 1800) + 1800), y: Math.floor(Math.random() * (150 - 1000) + 1000) }
    },

    chests: {
      'chest': { x: Math.floor(Math.random() * (0 - 1800) + 1800), y: Math.floor(Math.random() * (150 - 1000) + 1000) }
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

  function addChest(command: any) {
    const chestId = command.chestId;
    const chestX = command.chestX;
    const chestY = command.chestY;

    state.chests[chestId as ChestsIndex] = {
      x: chestX,
      y: chestY
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

  function removeChest(command: any) {
    const chestId = command.chestId

    delete state.chests[chestId as ChestsIndex]
  }

  var vx = 6;
  var vy = 6;


  function moveBot() {
    const bot = state.bot['Orc'];

    if (bot.x < 0) {
      vx = -vx;
    }
    if (bot.x > state.screen.width - 100) {
      vx = -vx;
    }
    if (bot.y < 80) {
      vy = -vy;
    }
    if (bot.y > state.screen.height - 130) {
      vy = -vy;
    }

    bot.x += vx;
    bot.y += vy;

  }
  function checkForCollisionBot() {
    const player = state.players["Bob"]
    const bot = state.bot['Orc']
    

    const playerCenterX = player.x + 50;
    const playerCenterY = player.y + 75; 

    const botCenterX = bot.x + 50;
    const botCenterY = bot.y + 50;

    var catBotX = playerCenterX - botCenterX;
    var catBotY = playerCenterY - botCenterY;

    var sumX = 50 + 50;
    var sumY = 75 + 50;

    if (Math.abs(catBotX) < sumX && Math.abs(catBotY) < sumY) {
      alert(`VOCÊ PERDEU!! Sua Pontuação foi: ${state.points['Points']}`)

      state.bot['Orc'] = { x: Math.floor(Math.random() * (0 - 1800) + 1800), y: Math.floor(Math.random() * (150 - 1000) + 1000)}
      state.chests['chest'] = { x: Math.floor(Math.random() * (0 - 1800) + 1800), y: Math.floor(Math.random() * (150 - 1000) + 1000)}

      state.points['Points'] = 0;
    }
  }


  function movePlayer(command: MoveCommand) {
    const accepetdMoves: KeyPressed = {
      ArrowUp(player: any) {
        if (player.y - 1 >= 80) {
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



      for (const chestId in state.chests) {
        const chest = state.chests[chestId as ChestsIndex]

        const playerCenterX = player.x + 50;
        const playerCenterY = player.y + 75;

        const chestCenterX = chest.x + 50;
        const chestCenterY = chest.y + 50;

        var catChestX = playerCenterX - chestCenterX;
        var catChestY = playerCenterY - chestCenterY;

        var sumX = 50 + 50;
        var sumY = 75 + 50;

        if (Math.abs(catChestX) < sumX && Math.abs(catChestY) < sumY) {

          state.points['Points']++

          console.log(state.points['Points'])

          removeChest({ chestId: chestId })

          state.chests['chest'] = {
            x: Math.floor(Math.random() * (0 - 1800) + 1800),
            y: Math.floor(Math.random() * (150 - 1000) + 1000)
          }
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
    addChest,
    removeChest,
    addPlayer,
    removePlayer,
    movePlayer,
    addBot,
    moveBot,
    checkForCollisionBot,
    state
  }

}