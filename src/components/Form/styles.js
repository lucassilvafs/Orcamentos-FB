import styled from "styled-components";

// export const ContainerCenter = styled.div`
//   // display: flex;
//   // flex-direction: column;
//   // align-items: center;
// `;

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
  width: 1050px;
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar { 
    display: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

// export const CardContainer = styled.div`
//   max-width: 1120px;
//   margin: 20px auto;
//   width: 98%;
//   background-color: #fff;
//   box-shadow: 0px 0px 5px #ccc;
//   border-radius: 5px;
//   display: flex;
//   justify-content: space-around;
//   padding: 15px 0px;
//   gap: 10px;
//   overflow-x: scroll;
//   // scroll-behavior: smooth;

//   @media (max-width: 750px) {
//     display: grid;
//   }
// `;

export const TopContainer = styled.div`
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
  font-size: 15px;
  border: 1px solid #ccc;
`;

export const InputDesc = styled.textarea`
  outline: none;
  resize: none;
  border-radius: 5px;
  padding: 5px 10px;
  height: 75px;
  font-size: 15px;
  border: 1px solid #ccc;
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
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #F29215;
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

export const Option = styled.option`
  
`;