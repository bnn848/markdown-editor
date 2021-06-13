import React from 'react';
import styled from 'styled-components';

/* interface */
interface Props {
  title: string
  children: React.ReactNode // JSXで扱える要素全て（呼び出し元で自由に設定）
};

/* Headerコンポーネント */
export const Header: React.FC<Props> = (props) => {
  return (
    <HeaderWrapper>
      <HeaderTitle>{props.title}</HeaderTitle>
      <HeaderControl>{props.children}</HeaderControl>
    </HeaderWrapper>
  )
};

/* style */
const HeaderWrapper = styled.header`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: space-between;
  line-height: 2rem;
  padding: 0.5rem 1rem;
`

const HeaderTitle = styled.div`
  font-size: 1.5rem;
`

const HeaderControl = styled.div`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: center;
  
  & > * {
    margin-left: 0.5rem;
  }
`