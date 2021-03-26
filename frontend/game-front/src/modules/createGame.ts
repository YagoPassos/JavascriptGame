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
  
  type FruitsIndex = keyof Fruits;
  
  interface State {
    players: Players;
    fruits: Fruits;
    screen: any;
  }

  
export default function createGame() {


    const state : State= {
        players: {
          'Bob': {x: 0, y:0}
        },
      
        fruits: {
          'fruit1': { x: 1800, y: 1000}
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

    function removeFruit(command : any){
      const fruitId = command.fruitId 

      delete state.fruits[fruitId as FruitsIndex]
    }

    function movePlayer(command: MoveCommand) {
      const accepetdMoves: KeyPressed = {
        ArrowUp(player: any) {
          if (player.y - 1 >= 5) {
            player.y = player.y - 20
          }
        },
        ArrowRight(player: any) {
          if (player.x + 1 < state.screen.width - 34) {
            player.x = player.x + 20
          }
        },
        ArrowDown(player: any) {
          if (player.y + 1 < state.screen.height - 34) {
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
              }
            }
      }
      const keyPressed = command.keyPressed;
      const playerId = command.playerId;
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
      state
    }

  }