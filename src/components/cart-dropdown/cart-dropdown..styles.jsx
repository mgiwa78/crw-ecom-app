import styled from "styled-components";

import {
  BaseButton,
  InvertedButton,
  GoogleSignInButton,
} from "../custom-btn/custom-btn.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},${GoogleSignInButton},${InvertedButton} {
    margin-top: auto;
  }
`;

export const CartDropdownEmptyMessage = styled.p`
  font-size: 18px;
  margin: 50px auto;
`;
export const CartDropdownItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
