import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;

  @media (max-width: 750px) {
    width: 1000px;
    background-color: #fff;
    padding: 20px;
    max-width: 1120px;
}
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const ThText = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  // text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width + "%" : "auto")};
`;

export const ThNumber = styled.th`
  text-align: center;
  border-bottom: inset;
  padding-bottom: 5px;
  // text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width + "%" : "auto")};
`;
