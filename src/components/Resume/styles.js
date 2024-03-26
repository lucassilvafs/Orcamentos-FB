import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  width: 98%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  // margin-top: -50px;
  justify-content: space-around;

  @media (max-width: 750px) {
    width: 70%;
  }
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
    width: 100%;

    p {
      font-size: 18px;
    }

    span {
      font-size: 22px;
    }

    svg {
      width: 15px;
      height: 15px;
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


export const ButtonDownload = styled.button`
  margin-bottom: 20px;
  padding: 10px 40px;
  border: 1px solid;
  border-radius: 5px;
  border-color: #F29215;
  cursor: pointer;
  font-size: 18px;
  color: #F29215;
  background-color: #fff;
  transition: all 0.25s ease;
  &:hover {
    background-color: #F29215;
    color: #fff;
}

  @media (max-width: 750px) {
    font-size: 16px;
  }

  @media (pointer: coarse) {
    display: none;
  }
`; 

export const ButtonShare = styled.button`
  display: none;
  margin-bottom: 20px;
  padding: 10px 40px;
  border: 1px solid;
  border-radius: 5px;
  border-color: #F29215;
  cursor: pointer;
  font-size: 18px;
  color: #F29215;
  background-color: #fff;
  transition: all 0.25s ease;
  &:hover {
    background-color: #F29215;
    color: #fff;
}

  @media (max-width: 750px) {
    font-size: 16px;
  }

  @media (pointer: coarse) {
    display:block;
  }
`; 

export const ButtonErase = styled.button`
  margin-bottom: 20px;
  padding: 10px 40px;
  border: 1px solid;
  border-radius: 5px;
  border-color: red;
  cursor: pointer;
  font-size: 18px;
  color: red;
  background-color: #fff;
  transition: all 0.25s ease;
  &:hover {
    background-color: red;
    color: #fff;
}

  @media (max-width: 750px) {
    font-size: 16px;
  }
`; 
