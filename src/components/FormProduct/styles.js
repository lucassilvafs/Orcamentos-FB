import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 20px auto;
  width: 98%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  padding: 15px 0px;
  gap: 10px;

  @media (max-width: 750px) {
    display: grid;
  }
`;

export const ItemsContainer = styled.div`
  max-width: 1120px;
  margin: 20px auto;
  width: 98%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  @media (min-width: 750px) {
    width: 1050px;
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
  width: 98%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  padding-top: 5px;

  @media (max-width: 750px) {
    width: 98%;
    overflow-x: scroll;
    scroll-behavior: smooth;
}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;

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
  width: 98%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-evenly;
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
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 200px;
`;

export const InputNumber = styled.input`
  outline: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 160px;
`;

export const InputDesc = styled.textarea`
  outline: none;
  resize: none;
  border-radius: 5px;
  padding: 5px 10px;
  height: 50px;
  font-size: 14px;
  border: 1px solid #ccc;
  width: 200px;
`;

export const TopInput = styled.input`
  outline: none;
  border-radius: 5px;
  width: 250px;
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
  width: 50px;
  margin: 0px 100px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: all 0.25s ease;
  background-color: #F29215;
  &:hover {
    background-color: #FFB703;

}
`;

export const Label = styled.label`
  
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
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const Option = styled.option`
  
`;

export const TopContainerModal = styled.div`
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