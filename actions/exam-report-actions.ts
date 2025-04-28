"use server";
import axios, { AxiosResponse, AxiosError } from 'axios';

interface AnalysisResponse {
  success: boolean;
  data: {
    reportSummary: string;
    keyFindings: string[];
    recommendations: string[];
  };
  error?: string;
}

const API_URL = "https://vulgaris-121988060190.us-central1.run.app/analyze"; // endpoint for medical report analysis



export const analyzeExamResults = async (request: FormData): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };

    const response: AxiosResponse<AnalysisResponse> = await axios.post(API_URL, request, config);

    if (!response.data ) {
      throw new Error("Invalid response from analysis service");
    }
console.log(response.data)
    
    
    return response.data;

  } catch (error) {
    const axiosError = error as AxiosError<AnalysisResponse>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data?.error || axiosError.message);
    } else if (axiosError.request) {
      throw new Error("No response received from analysis service");
    } else {
      throw new Error(`Analysis request error: ${axiosError.message}`);
    }
  }
};
