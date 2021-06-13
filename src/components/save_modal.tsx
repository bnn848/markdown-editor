import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './button';
import dayjs from 'dayjs'

/* interface */
interface Props {
  onSave: (title: string) => void // <--- 引数の型定義も可能
  onCancel: () => void
}

export const SaveModal: React.FC<Props> = (props) => {
  const { onCancel, onSave } = props;
  const [title, setTitle] = useState(dayjs().toString());

  return (
    <Wrapper>
      <Modal>
        <p>テキストの内容を保存します</p>
        <p>保存内容のタイトルを入力して「保存」ボタンを押してください。</p>
        <p>
          <TitleInput 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <Control>
          <Button onClick={onCancel} cancel>キャンセル</Button>
          <Button onClick={() => onSave(title)}>保存</Button>
        </Control>
      </Modal>
    </Wrapper>
  )
}


/* styled */
const Wrapper = styled.div`
  align-items: center;
  background-color: #0002;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`
const Modal = styled.div`
  background: #fff;
  padding: 1rem;
  width: 32rem;
`

const TitleInput = styled.input`
  width: 29rem;
  padding: 0.5rem;
`

const Control = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`
