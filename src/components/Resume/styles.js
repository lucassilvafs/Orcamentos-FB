import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  width: 98%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  // margin-top: -50px;
  justify-content: space-around;
`;

export const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
  padding: 5px 15px;
  width: 30%;

  @media (max-width: 750px) {
    width: 20%;

    p {
      font-size: 12px;
    }

    span {
      font-size: 20px;
    }

    svg {
      display: none;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin: 20px auto;

  svg {
    width: 25px;
    height: 25px;
  }
`;

export const HeaderTitle = styled.p`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;

export const Total = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

export const Button = styled.button`
  margin-bottom: 20px;
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  // background-color: #FFB703;
  // color: white;
  background-color: #F29215;
`;

