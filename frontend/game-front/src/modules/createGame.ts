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
    bot:Bot,
    screen: any;
  }

  
export default function createGame() {


    const state : State= {
        players: {
          'Bob': {x: 0, y:0}
        },

        bot: {
          'Orc': {x: 1, y:1}
        },
      
        fruits: {
          'fruit': { x: 1500, y: 500}
        },

        screen: {
            width: window.screen.width,
            height: window.screen.height

        }
      }

    function addPlayer(command: any){
      const playerId = command.playerId;
      const playerX = command.playerX;
      const playerY = command.playerY;

      state.players[playerId as PlayersIndex] = {
        x: playerX,
        y: playerY
      }
    }

    function removePlayer(command : MoveCommand){
      const playerId = command.playerId 

      delete state.players[playerId as PlayersIndex]
    }

    function addFruit(command: any){
      const fruitId = command.fruitId;
      const fruitX = command.fruitX;
      const fruitY = command.fruitY;

      state.fruits[fruitId as FruitsIndex] = {
        x: fruitX,
        y: fruitY
      }
    }

    function addBot(command: any){
      const botId = command.botId;
      const botX = command.botX;
      const botY = command.botY;

      state.bot[botId as BotIndex] = {
        x: botX,
        y: botY
      }
    }

    function removeFruit(command : any){
      const fruitId = command.fruitId 

      delete state.fruits[fruitId as FruitsIndex]
    }

    function moveBot(){
      const bot = state.bot['Orc'];
        console.log(bot)
    
    }

    function movePlayer(command: MoveCommand) {
      const accepetdMoves: KeyPressed = {
        ArrowUp(player: any) {
          if (player.y - 1 >= 10) {
            player.y = player.y - 20
          }
        },
        ArrowRight(player: any) {
          if (player.x + 1 < state.screen.width - 98) {
            player.x = player.x + 20
          }
        },
        ArrowDown(player: any) {
          if (player.y + 1 < state.screen.height - 150) {
            player.y = player.y + 20
          }
        },
        ArrowLeft(player: any) {
          if (player.x - 1 >= 10) {
            player.x = player.x - 20
          }
        }
      }

      const checkForCollision = () => {
            const player = state.players[playerId]

            for (const fruitId in state.fruits){
              const fruit = state.fruits[fruitId as FruitsIndex]

              if (player.x === fruit.x && player.y === fruit.y){

                removeFruit({ fruitId: fruitId})
                
                console.log( state.fruits['fruit'])

                state.fruits['fruit'] = {
                  x: Math.random() * (0 - 1980) + 1980,
                  y: Math.random() * (0 - 1080) + 1080
                }

                console.log( state.fruits['fruit'])
              }
            }      

              if (player.x === bot.x && player.y === bot.y){
                alert("LOST")
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