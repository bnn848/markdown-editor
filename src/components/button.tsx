import React from 'react';
import styled from 'styled-components';

/* interface (メンバーと型を定義し、定義したものがなかったりしたらエラーを返す) */
interface Props {
  cancel?: boolean // ~? パラメータを指定してもしなくてもどっちでもいい、という型指定
  children: string
  onClick: () => void // 戻り値はないのでvoidと定義する
};

export const Button: React.FC<Props> = (props) => {
  return (
    <StyledButton className={props.cancel ? 'cancel' : ''} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  )
};

/* style */
const StyledButton = styled.button`
background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

  &.cancel {
    background-color: #fff;
    border: 1px solid gray;
    color: gray;
  }
`;