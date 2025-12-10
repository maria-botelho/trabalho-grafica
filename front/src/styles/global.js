// global.js
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box; 
        font-family: 'Poppins', sans-serif;
    }
    
    body {
        min-width: 100vw;
        min-height: 100vh;
        background-color: #E5E5E5; /* Secundária (Cinza Claro) */
    }
`;

export default Global;