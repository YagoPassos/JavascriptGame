import styled from 'styled-components';
import BackgroundImg from '../../../img/background.png'

export const CanvasContainer = styled.canvas`
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    image-rendering: -moz-crisp-edges;

    background: url(${BackgroundImg}) no-repeat center; 
    background-size: cover;

    display:block;
    border: 5px solid black;
    width: 80%;
    height: 90%;
    margin: auto;

    
`;
