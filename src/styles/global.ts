import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    button {
        cursor: pointer;
    }

    .Toastify__toast--success {
        background: #00A57C !important;
        font: 14px Montserrat, sans-serif !important;
        font-weight: 500 !important;
    }
    .Toastify__toast--error {
        background: #de3b3b !important;
        font: 14px Montserrat, sans-serif !important;
        font-weight: 500 !important;
    }
    .Toastify__toast--warning {
        background: rgb(255, 160, 72) !important;
        font: 14px Montserrat, sans-serif !important;
        font-weight: 500 !important;
    }
`;
