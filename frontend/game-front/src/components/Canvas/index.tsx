import { ReactNode } from 'react';

import { CanvasContainer } from './styles';

interface CanvasProps {
  children: ReactNode;
}

function Canvas({ children }: CanvasProps) {
  return (
    <CanvasContainer>
      {children}
    </CanvasContainer>
  );
};

export default Canvas;
