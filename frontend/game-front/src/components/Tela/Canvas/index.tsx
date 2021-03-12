import { ReactNode, useRef, useEffect, useState } from 'react';
import { CanvasContainer } from './styles';


interface CanvasProps {
  // children: ReactNode;
}

function Canvas({ }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  var context : any;

  useEffect(() => {
    if (canvasRef.current) {
      
      const canvas = canvasRef.current;
      context = canvas.getContext('2d');

      const game: any = {
        players: {
          'Bob': { x: 1, y: 1 },
          'Paul': { x: 8, y: 8 }
        },

        fruits: {
          'fruits': { x: 3, y: 1 }
        }
      }

      const renderScreen = () => {
        if (context) {

          context.clearRect(0,0,10,10);

          for (var playerId in game.players) {
            const player = game.players[playerId];
            context.fillStyle = 'black';
            context.fillRect(player.x, player.y, 1, 1);
          }

          for (var fruitId in game.fruits) {
            const fruit = game.fruits[fruitId];
            context.fillStyle = 'green';
            context.fillRect(fruit.x, fruit.y, 1, 1);
          }
        }
      }
      renderScreen();
      

      const color = 'blue';
      const positionX = 50;
      const positionY = 50;
      const width = 10;
      const height = 10;
      if (context) {
        context.fillStyle = color;
        context.fillRect(positionX, positionY, width, height);
      }
    }

  }, [context])

  return (
    <CanvasContainer width="10" height="10" ref={canvasRef}/>
  );
};

export default Canvas;
