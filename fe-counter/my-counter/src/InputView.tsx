import styled from '@emotion/styled';


interface InputViewProps {
  value: number;
  onChange: (value: number) => void;
}


const InputView = ({ value, onChange }: InputViewProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!Number.isNaN(newValue)) {
      onChange(newValue);
    }
  };
  
  return <Input type="number" value={value} onChange={handleChange} />;
};

export default InputView;

const Input = styled.input`
  width: 100px;
  height: 50px;
  border: 1px solid #02621d;
  border-radius: 12px;
  text-align: center;
  font-size: 32px;
`;