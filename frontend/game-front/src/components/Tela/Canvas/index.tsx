import { useRef, useEffect, useState, useCallback } from 'react';
import { CanvasContainer } from './styles';

/* eslint-disable */

interface Command {
  playerId: string;
  keyPressed: any;
}

interface Coordinates{
  x: number;
  y:  number;
}

interface Players{
  'Bob' : Coordinates;
  'Paul': Coordinates;
}

interface Fruits{
  fruits : Coordinates;
}

interface State{
  players: Players;
  fruits: Fruits;
}


function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {

    if (canvasRef.current) {
     
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const currentPlayerId = 'Bob';

     const createGame =() =>{

      const state : State = {
        players: {
          'Bob': { x: 1, y: 1 },
          'Paul': { x: 8, y: 8 }
        },

        fruits: {
          'fruits': { x: 3, y: 1 }
        }
      }

       function movePlayer(command: Command){
          console.log(`Moving ${command.playerId} with ${command.keyPressed}`)

          const keyPressed = command.keyPressed;
          const player = game.state.players[command.playerId]

          if (keyPressed === 'ArrowUp' && player.y - 1 >= 0){
            
          }
          if (keyPressed === 'ArrowRight' && player.x - 1 < 10){

          }
          if (keyPressed === 'ArrowDown' && player.x - 1 < 10){

          }
          if (keyPressed === 'ArrowLeft' && player.y - 1 >= 0){

          }
       }

       return{
         movePlayer,
         state
       }
     }

    

     const handleKeydown = (event : any) => {
        const keyPressed = event.key;
        
        
        const command : Command = {
            playerId: 'Bob',
            keyPressed: keyPressed
        }

          game.movePlayer(command)
     }

     document.addEventListener('keydown', handleKeydown)
        
      const game = createGame();
      
   

      if (context){
      const renderScreen = () => {
            context.clearRect(0,0,10,10);

            for (const playerId in game.state.players) {
              const player = game.state.players[playerId];
              context.fillStyle = 'black';
              context.fillRect(player.x, player.y, 1, 1);
            }

            for (const fruitId in state.fruits) {
              const fruit = game.state.fruits[fruitId];
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
