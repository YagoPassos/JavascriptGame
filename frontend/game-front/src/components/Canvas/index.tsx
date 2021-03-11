import { ReactNode, useRef, useEffect } from 'react';


interface CanvasProps {
  // children: ReactNode;
}

function Canvas({  }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {

    if (canvasRef.current) {
   
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      const color = 'blue';
      const positionX = 50;
      const positionY = 50;
      const width = 250;
      const height = 250;
      if (context) {
        context.fillStyle = color;
        context.fillRect(positionX, positionY, width, height);
      }
    }
  }, [])
  return (
    <canvas width={window.screen.width} height={window.screen.height} ref={canvasRef}/>
  );
};

export default Canvas;
