import { useRef, useEffect, useState, useCallback } from 'react';
import { CanvasContainer } from './styles';

/* eslint-disable */

interface Command {
  playerId: string;
  keyPressed: any;
}

interface Coordinates {
  x: number;
  y: number;
}

interface Players {
  'Steve': Coordinates;
  'Paul': Coordinates;
  'Bob': Coordinates;
}

interface KeyPressed {
  'ArrowUp': any;
  'ArrowRight': any;
  'ArrowDown': any;
  'ArrowLeft': any;
}

type PlayersIndex = keyof Players;
type KeyIndex = keyof KeyPressed;
type BobImg = HTMLImageElement;

interface Fruits {
  'fruits': Coordinates;
}

type FruitsIndex = keyof Fruits;

interface State {
  players: Players;
  fruits: Fruits;
}




function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {

    if (canvasRef.current) {

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');


      const createGame = () => {

        const state: State = {
          players: {
            'Steve': { x: 1800, y: 1000 },
            'Paul': { x: 1800, y: 500 },
            'Bob': { x: 10, y: 10 }
          },

          fruits: {
            'fruits': { x: 1830, y: 0 }
          }
        }

        function movePlayer(command: Command) {
          const accepetdMoves: KeyPressed = {
            ArrowUp(player: any) {
              if (player.y - 1 >= 5) {
                player.y = player.y - 10
              }
            },
            ArrowRight(player: any) {
              if (player.x + 1 < screen.width - 34) {
                player.x = player.x + 10
              }
            },
            ArrowDown(player: any) {
              if (player.y + 1 < screen.height - 34) {
                player.y = player.y + 10
              }
            },
            ArrowLeft(player: any) {
              if (player.x - 1 >= 10) {
                player.x = player.x - 10
              }
            }
          }

          const keyPressed = command.keyPressed;
          const player = game.state.players[command.playerId as PlayersIndex]
          const moveFunction = accepetdMoves[keyPressed as KeyIndex]

          if (moveFunction) {
            moveFunction(player)
          }

        }

        return {
          movePlayer,
          state
        }
      }


      const createKeyboardListener = () => {

        const state = {
          observers: [] as any
        }

        function subscribe(obeserverFunction: any) {
          state.observers.push(obeserverFunction)
        }

        function notifyAll(command: Command) {
          // console.log(`Notifying ${state.observers.length} observers`)

          for (const observerFunction of state.observers) {
            observerFunction(command)
          }
        }
        const handleKeydown = (event: any) => {
          const keyPressed = event.key;


          const command: Command = {
            playerId: 'Bob',
            keyPressed: keyPressed
          }

          notifyAll(command)
        }

        document.addEventListener('keydown', handleKeydown)

        return {
          subscribe
        }

      }

      const keyboardListener = createKeyboardListener();
      const game = createGame();

      keyboardListener.subscribe(game.movePlayer)



      if (context) {
        const renderScreen = () => {
          context.clearRect(0, 0, screen.width, screen.height);

          for (const playerId in game.state.players) {
            const player = game.state.players[playerId as PlayersIndex];

            if (playerId === 'Bob') {
              var img = new Image();
              img.src = '../../../img/Bob.svg';

              context.drawImage(img, player.x, player.y, 90, 135)
           
            } else {
              // context.fillStyle = 'black';
              // context.fillRect(player.x, player.y, 35, 35);
            }
          }

          for (const fruitId in game.state.fruits) {
            const fruit = game.state.fruits[fruitId as FruitsIndex];
            // context.fillStyle = 'green';
            // context.fillRect(fruit.x, fruit.y, 35, 35);
          }

          requestAnimationFrame(renderScreen);
        }
        renderScreen();
      }
    }
  }, [])


  return (
    <CanvasContainer width={screen.width} height={screen.height} ref={canvasRef} />
  );
};

export default Canvas;
