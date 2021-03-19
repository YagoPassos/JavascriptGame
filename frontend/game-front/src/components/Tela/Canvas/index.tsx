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
  'Bob': Coordinates;
  'Paul': Coordinates;
}

type PlayersIndex = keyof Players;

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
            'Bob': { x: 1, y: 1 },
            'Paul': { x: 8, y: 8 }
          },

          fruits: {
            'fruits': { x: 3, y: 1 }
          }
        }

        function movePlayer(command: Command) {
          console.log(`Moving ${command.playerId} with ${command.keyPressed}`)

          const keyPressed = command.keyPressed;
          const player = game.state.players[command.playerId as PlayersIndex]

          if (keyPressed === 'ArrowUp' && player.y - 1 >= 0) {
            player.y = player.y - 1
            return

          }
          if (keyPressed === 'ArrowRight' && player.x + 1 < 10) {
            player.x = player.x + 1
            return
          }
          if (keyPressed === 'ArrowDown' && player.y + 1 < 10) {
            player.y = player.y + 1
            return
          }
          if (keyPressed === 'ArrowLeft' && player.x - 1 >= 0) {
            player.x = player.x - 1
            return
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

        function subscribe(obeserverFunction : any){
          state.observers.push(obeserverFunction)
        }

        function notifyAll(command : Command) {
          console.log(`Notifying ${state.observers.length} observers`)

          for (const observerFunction of state.observers){
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



      }

      const keyboardListener = createKeyboardListener();
      const game = createGame();



      if (context) {
        const renderScreen = () => {
          context.clearRect(0, 0, 10, 10);

          for (const playerId in game.state.players) {
            const player = game.state.players[playerId as PlayersIndex];
            console.log(player)
            context.fillStyle = 'black';
            context.fillRect(player.x, player.y, 1, 1);
          }

          for (const fruitId in game.state.fruits) {
            const fruit = game.state.fruits[fruitId as FruitsIndex];
            context.fillStyle = 'green';
            context.fillRect(fruit.x, fruit.y, 1, 1);
          }

          requestAnimationFrame(renderScreen);
        }
        renderScreen();
      }
    }
  }, [])

  return (
    <CanvasContainer width="10" height="10" ref={canvasRef} />
  );
};

export default Canvas;
