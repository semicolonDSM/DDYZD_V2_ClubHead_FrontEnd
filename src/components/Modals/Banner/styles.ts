import styled from "styled-components"
export const Wrapper=styled.div`
    position: relative;
    z-index: 9999;
    background: white;
    padding: 0 15px;
    border-radius: 10px;
    display: flex;
    width: 100%;
    max-width: 1024px;
    flex-direction: column;
    & h3{
        border-bottom: 1px solid #0000001a;
        font-weight: 700;
        font-size: 22px;
        text-align: center;
        padding: 15px;
        margin-bottom: 10px;
    }
    & img{
        width: 100%;
        max-width: 1024px;
        object-fit: cover;
        height: 300px;
    }
    & button{
        margin-top: 10px;
        border: none;
        background: #350871;
        color: white;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 20px;
    }
`