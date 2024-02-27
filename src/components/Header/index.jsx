import React from "react";
import * as C from "./styles";
import logo from "../../images/icone.png"

const Header = () => {
  return (
    <C.Container>
      <C.Img src={logo}></C.Img>
      <C.Header>
        <C.Title>Orçamento</C.Title>
      </C.Header>
    </C.Container>
  );
};

export default Header;
