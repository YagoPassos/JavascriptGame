import React from 'react';
import { CanvasContainer } from './components/Canvas/styles';
import {GlobalStyles} from './styles/globalStyles'

function App() {

  // const context = crea;
  const color = 'red';
  const positionX = 0;
  const positionY = 0;
  const width = 250;
  const height = 250;


  return (
    <div className="App">

      <GlobalStyles/>
      <CanvasContainer/>

    </div>
  );
}

export default App;
