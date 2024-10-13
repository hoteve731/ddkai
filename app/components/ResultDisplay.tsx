interface ResultDisplayProps {
    result: string | null;
    loading: boolean;
  }
  
  export default function ResultDisplay({ result, loading }: ResultDisplayProps) {
    if (loading) {
      return <p>똑똑 AI가 판독하는 중...</p>;
    }
  
    if (!result) {
      return null;
    }
  
    return (
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">분석 결과:</h2>
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded overflow-x-auto">
          {result}
        </pre>
      </div>
    );
  }
