import styled from '@emotion/styled';
import { useState } from 'react';

function App() {
  // history 관리를 위한 state
  const [history, setHistory] = useState<number[]>([0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputNumber, setInputNumber] = useState<number>(0);

  // 현재 count 값
  const count = history[currentIndex];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = Number(e.target.value);
    if (!Number.isNaN(newNumber)) {
      setInputNumber(newNumber);
    }
  };

  const setCountAndResetInput = (newCount: number) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newCount);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setInputNumber(0);
  };

  const handleIncrement = () => {
    setCountAndResetInput(count + inputNumber);
  };

  const handleDecrement = () => {
    setCountAndResetInput(count - inputNumber);
  };

  // Undo 기능
  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Redo 기능
  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Undo/Redo 버튼 활성화 여부
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

   return (
    <Container>
      <HeaderContainer>
        <Title>React Counter</Title>
      </HeaderContainer>
      <CounterContainer>
        <NumberText>{count}</NumberText>
        <StyledInput value={inputNumber} onChange={handleInputChange} />
      </CounterContainer>
      <FooterContainer>
        <CircleButton onClick={handleUndo} disabled={!canUndo}>
          <ActionText>⇦</ActionText>
        </CircleButton>
        <CircleButton onClick={handleIncrement}>
          <ActionText>+</ActionText>
        </CircleButton>
        <CircleButton onClick={handleDecrement}>
          <ActionText>-</ActionText>
        </CircleButton>
        <CircleButton onClick={handleRedo} disabled={!canRedo}>
          <ActionText>⇨</ActionText>
        </CircleButton>
      </FooterContainer>
    </Container>
   );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  background-color: #e2dddd;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
`;
const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
const NumberText = styled.span`
  font-size: 80px;
  font-weight: bold;
  color: #02621d;
`;
const StyledInput = styled.input`
  width: 100px;
  height: 50px;
  border: 1px solid #02621d;
  border-radius: 12px;
  text-align: center;
  font-size: 32px;
`;
const FooterContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
const CircleButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #464cf0;
  color: white;
  cursor: pointer;
  border: none;
  &:hover:not(:disabled) {
    background-color: #6f73e4;
  }
  &:active:not(:disabled) {
    background-color: #464cf0;
  }
  &:disabled {
    background-color: #9b9eb8;
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
const ActionText = styled.span`
  font-size: 24px;
  font-weight: bold;
`;
