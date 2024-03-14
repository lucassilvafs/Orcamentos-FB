import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 150px;
  text-align: center;
  // align-items: center;
  background: #F29215;
`;

export const ContainerDrawer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -30px;
`;

export const ContainerDiv = styled.div`
`;

export const Header = styled.h1`
  padding-top: 20px;
  color: #fff;

  @media (max-width: 750px) {
    font-size: 28px;
  }
`;

export const Img = styled.img`
  height: 80px;
  width: 80px;
  margin-right: 20px;

  @media (max-width: 750px) {
    height: 60px;
    width: 60px;
    margin-top: 10px;
  }
`;

export const ButtonDrawer = styled.button`
  align-self: center;
  height: 45px;
  width: 90%;
  margin-top: 20px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #F29215;
  transition: all 0.25s ease;
  font-size: 15px;
  &:hover {
    background-color: #FFB703;
}
`;

export const Button = styled.button`
  height: 45px;
  width: 45px;
  margin: 20px 0 0 30px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #F29215;
  font:{
    size:12px;
    weight:bold;
  }
`;
