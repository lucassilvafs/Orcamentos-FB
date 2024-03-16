import React, { useState } from "react";
import * as C from "./styles";
import logo from "../../images/icone.png"
import { Drawer } from "antd";
import { FaBars } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [visible, setVisible] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <C.Container>
      <Drawer
        title={"Menu"}
        width={300}
        onClose={() => setVisible(false)}
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
        <C.Button onClick={() => setVisible(true)}><FaBars style={{ height:"25px", width:"25px" }}/></C.Button>
      </C.ContainerDiv>
      <C.ContainerTitle>
        <C.Img src={logo}></C.Img>
        <C.Header>{location.pathname === "/" ? "Orçamento" : "Produtos"}</C.Header>
      </C.ContainerTitle>
      <C.ContainerDiv></C.ContainerDiv>
    </C.Container>
  );
};

export default Header;
