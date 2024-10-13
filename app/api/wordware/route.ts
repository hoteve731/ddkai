import { NextResponse } from 'next/server';
import { callAPI } from '@/app/utils/api';

export async function POST(request: Request) {
  try {
    const { textInput } = await request.json();
    console.log('받은 텍스트 입력:', textInput);

    const result = await callAPI(textInput);
    return NextResponse.json({ result });
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return NextResponse.json({ error: '결과를 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
