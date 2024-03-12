import styled from "styled-components";

export const Tr = styled.tr``;

export const Td = styled.td`
  margin: 30px;
  padding-top: 15px;
  padding-right: 25px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  word-break: break-all;

  svg {
    width: 18px;
    height: 18px;
  }
`;
