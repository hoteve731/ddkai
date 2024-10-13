'use client';

import { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (input: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/wordware', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textInput: input }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('오류 발생:', error);
      setResult('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">식품 분석기</h1>
      <InputForm onSubmit={handleSubmit} />
      <ResultDisplay result={result} loading={loading} />
    </div>
  );
}
