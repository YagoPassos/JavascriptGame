import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
        outline: none;
        overflow:hidden;

        >button{
            cursor: pointer;
        }
    }
    body{
        width:100%;
        height: 100%;
        background-color: black;
    }
    

`