import { listeners } from 'node:process';
import { useRef, useEffect, useState, useCallback } from 'react';
import { CanvasContainer } from './styles';
import createKeyboardListener from '../../../modules/keyboardListener'
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

interface Bot {
  [key: string]: Coordinates
}

type FruitsIndex = keyof Fruits;
type BotIndex = keyof Bot;

interface State {
  players: Players;
  fruits: Fruits;
  bot: Bot;
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

          game.moveBot();

          for (const playerId in game.state.players) {
            const player = game.state.players[playerId as PlayersIndex];


            var Doug = new Image();
            Doug.src = '../../../img/Doug.png';

            context.drawImage(Doug, player.x, player.y, 100, 150)

          }
          for (const fruitId in game.state.fruits) {
            const fruit = game.state.fruits[fruitId as FruitsIndex];
            // context.fillStyle = 'red';
            // context.fillRect(fruit.x, fruit.y, 100, 100);

            var treasure = new Image();
            treasure.src = '../../../img/Treasure.png';

            context.drawImage(treasure, fruit.x, fruit.y, 100, 100)
          }

          for (const botID in game.state.bot) {
            const bot = game.state.bot[botID as BotIndex]

            var orc = new Image();
            orc.src = '../../../img/Orc.png';

            context.drawImage(orc, bot.x, bot.y, 120, 150)
          }
          context.fillStyle = 'white'
          context.font = "120px";
          context.fillText(`POINTS : ${game.state.points['Points']}`, 700, 100)
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
