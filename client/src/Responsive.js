import { css } from "styled-components"

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 380px) {
            ${props}
        }
    `
}
export const x = (props) => {
    return css`
        @media only screen and (max-width: 375px) {
            ${props}
        }
    `
}
export const tablet = (props) => {
    return css`
        @media only screen and (max-width: 768px) {
            ${props}
        }
    `
}
export const xr = (props) => {
    return css`
        @media only screen and (max-width: 414px) {
            ${props}
        }
    `
}