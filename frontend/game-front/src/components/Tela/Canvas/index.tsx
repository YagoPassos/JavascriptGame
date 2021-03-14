import { useRef, useEffect, useState, useCallback } from 'react';
import { CanvasContainer } from './styles';

/* eslint-disable */


function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [context, setContext]: any = useState(null)
  

  useEffect(() => {

    if (canvasRef.current) {
      const game: any = {
        players: {
          'Bob': { x: 1, y: 1 },
          'Paul': { x: 8, y: 8 }
        },

        fruits: {
          'fruits': { x: 3, y: 1 }
        }
      }



      const canvas = canvasRef.current;
      setContext(canvas.getContext('2d'));

     

      if (context){
      const renderScreen = () => {
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
          requestAnimationFrame(renderScreen);
        }
        renderScreen();
      }
    }
  }, [context])

  return (
    <CanvasContainer width="10" height="10" ref={canvasRef} />
  );
};

export default Canvas;
