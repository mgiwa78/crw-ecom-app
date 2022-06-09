import styledComponents from "styled-components";

export const NavigationBarContainer = styledComponents.div`
height: 70px;
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 25px;

`;

export const LogoContainer = styledComponents.div`
    height: 100%;
    width: 70px;
    padding: 25px;
    `;

export const NavLinksContainer = styledComponents.div`.nav-links-container {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const NavLink = styledComponents.div`
 padding: 10px 15px;
cursor: pointer;`;
