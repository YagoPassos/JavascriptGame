import { listeners } from 'node:process';
import { useRef, useEffect, useState, useCallback } from 'react';
import { CanvasContainer } from './styles';
import  createKeyboardListener  from '../../../modules/keyboardListener'
import createGame from '../../../modules/createGame'

/* eslint-disable */

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
}




function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {

    if (canvasRef.current) {

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const keyboardListener = createKeyboardListener();
      const game = createGame();

      keyboardListener.subscribe(game.movePlayer)

      if (context) {
        context.imageSmoothingEnabled = false;

        const renderScreen = () => {
          context.clearRect(0, 0, screen.width, screen.height);

          for (const playerId in game.state.players) {
            const player = game.state.players[playerId as PlayersIndex];        
          
            if (playerId === 'Bob') {
              var img = new Image();
              img.src = '../../../img/Bob.jpg';

              context.drawImage(img, player.x, player.y, 90, 135)           
            } else {
              context.fillStyle = 'black';
              context.fillRect(player.x, player.y, 35, 35);
            }
          }

          for (const fruitId in game.state.fruits) {
            const fruit = game.state.fruits[fruitId as FruitsIndex];
            context.fillStyle = 'green';
            context.fillRect(fruit.x, fruit.y, 35, 35);
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
