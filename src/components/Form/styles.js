import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 20px auto;
  width: 95%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-evenly;
  padding: 15px 0px;
  gap: 10px;

  @media (max-width: 750px) {
    display: grid;
  }
`;

export const ItemsContainer = styled.div`
  max-width: 1120px;
  margin: 20px auto;
  width: 95%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0px;
  gap: 10px;

  @media (max-width: 750px) {
    display: grid;
  }
`;

export const CardContainer = styled.div`
  width: 90%;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  margin-left: 20px;
  margin-top: 10px;

  @media (min-width: 750px) {
    width: 1050px;
    height: 65px;
    display: flex;
    gap: 10px;
    overflow-x: scroll;
    scroll-behavior: smooth;
    ::-webkit-scrollbar { 
      display: none;
    }
  }
`;

export const GridContainer = styled.div`
  width: 95%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;

  @media (max-width: 750px) {
    width: 95%;
    overflow-x: scroll;
    scroll-behavior: smooth;
}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  
  @media (max-width: 750px) {
    display: none;
  }
`;

export const InputText = styled.input`
  border-radius: 5px;
`;

export const TopContainer = styled.div`
  max-width: 1120px;
  margin: 20px auto;
  width: 95%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  padding: 15px 0px;
  gap: 10px;
  margin-top: -40px;

  @media (max-width: 750px) {
    display: grid;
  }
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  outline: none;
  border-radius: 5px;
  font-family: Poppins;
  padding: 5px 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  margin-bottom: 10px;

  @media (max-width: 750px) {
    width: 230px;
  }
`;

export const InputDesc = styled.textarea`
  outline: none;
  font-family: Poppins;
  resize: none;
  border-radius: 5px;
  padding: 5px 10px;
  height: 70px;
  font-size: 15px;
  border: 1px solid #ccc;
`;

export const TopInput = styled.input`
  outline: none;
  border-radius: 5px;
  width: 230px;
  padding: 5px 10px;
  font-size: 15px;
  border: 1px solid #ccc;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-left: 20px;
    margin-right: 5px;
    accent-color: black;
    margin-top: 0;
  }
`;

export const Button = styled.button`
  align-self: center;
  height: 45px;
  // font-size: 15px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #F29215;
  transition: all 0.25s ease;
  font:{
    size:12px;
    weight:bold;
  }
  &:hover {
    background-color: #FFB703;
}
`;

export const ButtonScroll = styled.button`
  align-self: center;
  height: 40px;
  width: 40px;
  margin: 0px 40px;
  padding: 5px 10px;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  color: white;
  transition: all 0.25s ease;
  background-color: #F29215;
  &:hover {
    background-color: #FFB703;

}
`;

export const Label = styled.label`
  font-family: Poppins;
`;

export const Select = styled.select`
  outline: none;
  border-radius: 5px;
  color: #000;
  background-color: #fff;
  width: 250px;
  padding: 5px 10px;
  font-size: 15px;
  border: 1px solid #ccc;
`;

export const HeaderTitle = styled.p`
  margin: 0px;
  font-size: 20px;
  font-weight: bold;
  align-text: center;
  align-self: center;

  @media (max-width: 750px) {
    margin-left: 155px;
  }
`;

export const InputSearch = styled.input`
  outline: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  
  @media (max-width: 750px) {
    width: 230px;
    margin-left: 75px;
  }
`;

export const Option = styled.option``;

export const ResumeDiv = styled.div`
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

export const HeaderTitleResume = styled.p`
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

export const ContainerEx = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  width: 800px;
  border: 1px solid white;
  background-color: white;
`; 

export const ContainerModal = styled.div`
  max-width: 1120px;
  margin: 20px auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px 0px;
  gap: 10px;

  @media (max-width: 750px) {
    display: grid;
  }
`;

export const InputContentModal = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelModal = styled.label`
`;

export const InputModal = styled.input`
  outline: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

export const InputDescModal = styled.textarea`
  outline: none;
  font-family: Poppins;
  resize: none;
  border-radius: 5px;
  padding: 5px 10px;
  height: 70px;
  font-size: 15px;
  border: 1px solid #ccc;
`;
