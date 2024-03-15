import React, { useState, useEffect, useRef } from "react";
import * as C from "./styles";
import logo from "../../images/icone.png"
import { Card, Button, Input, Drawer, Form } from "antd";
import { FaBars } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [login, setIsLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const showDrawer = (type) => {
    // if (type === "login") {
    //   setIsLogin(true);
    // } else if (type === "signUp") {
    //   setSignUp(true);
    // }
    setVisible(true);
  };

  const closeDrawer = () => {
    setSignUp(false);
    setIsLogin(false);
    setVisible(false);
  };

  return (
    <C.Container>
      <Drawer
        title={"Menu"}
        width={300}
        onClose={closeDrawer}
        open={visible}
        bodyStyle={{ paddingBottom: 80 }}
        placement="left"
      >
        <C.ContainerDrawer>
          <C.ButtonDrawer onClick={() => navigate("/")}>Orçamento</C.ButtonDrawer>
          <C.ButtonDrawer onClick={() => navigate("/products")}>Produtos</C.ButtonDrawer>
        </C.ContainerDrawer>
      </Drawer>
      <C.ContainerDiv>
        <C.Button onClick={showDrawer}><FaBars style={{ height:"25px", width:"25px" }}/></C.Button>
      </C.ContainerDiv>
      <C.ContainerTitle>
        <C.Img src={logo}></C.Img>
        <C.Header>{location.pathname === "/" ? "Orçamento" : "Cadastro de produtos"}</C.Header>
      </C.ContainerTitle>
      <C.ContainerDiv></C.ContainerDiv>
    </C.Container>
  );
};

export default Header;
