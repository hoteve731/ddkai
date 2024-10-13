'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { callAPI } from '../utils/api';
import { CaretLeft } from '@phosphor-icons/react';
import Link from 'next/link';

export default function ResultPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    async function fetchResult() {
      if (query) {
        try {
          setLoading(true);
          setError(null);
          console.log('결과 페이지에서 API 호출 시작:', query);
          const apiResult = await callAPI(query);
          console.log('결과 페이지에서 API 응답 받음:', apiResult);
          setResult(apiResult);
        } catch (error) {
          console.error('결과 가져오기 실패:', error);
          setError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      }
    }

    fetchResult();
  }, [query]);

  return (
    <div className="container mx-auto p-8 relative">
      <Link href="/" className="absolute top-4 left-4 text-black hover:text-gray-600">
        <CaretLeft size={24} />
      </Link>
      <h1 className="text-2xl font-bold mb-4 mt-12">검색 결과: {query}</h1>
      {loading ? (
        <p>결과를 불러오는 중...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
