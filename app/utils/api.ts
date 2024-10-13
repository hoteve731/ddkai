import axios from 'axios';

const API_URL = "https://app.wordware.ai/api/released-app/d6349058-a412-4a4d-bbe5-6c8dd151e60c/run";
const API_KEY = "ww-84WhkeANbgw6Bh7V5y8NjYATELy3P4QJcb47FzkM74TvbTRXlEsUy4";

export async function callAPI(textInput: string): Promise<string> {
  try {
    const response = await axios.post(API_URL, {
      inputs: {
        "텍스트 인풋 (이름)": textInput
      },
      version: "^1.5"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      responseType: 'stream'
    });

    let fullResponse = '';
    let jsonStarted = false;
    for await (const chunk of response.data) {
      const chunkStr = chunk.toString('utf-8');
      if (chunkStr.includes('json')) {
        jsonStarted = true;
        fullResponse = chunkStr.split('json')[1];
      } else if (jsonStarted) {
        fullResponse += chunkStr;
      }
    }

    // JSON 파싱 및 예쁘게 포맷팅
    try {
      const jsonResult = JSON.parse(fullResponse);
      return JSON.stringify(jsonResult, null, 2);
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
      return fullResponse;
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
}
