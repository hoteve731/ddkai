import { useState } from 'react';

interface InputFormProps {
  onSubmit: (input: string) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="식품 이름을 입력하세요.(ex:농심 새우깡)"
        className="w-full px-3 py-2 border rounded"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        분석하기
      </button>
    </form>
  );
}