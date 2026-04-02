import axios from "axios";

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnalyzeWeldResponse {
  hasDefect: boolean;
  defectType: string;
  severity: "low" | "medium" | "high" | "unknown";
  confidence: number;
  comment: string;
  recommendation: string;
  box?: BoundingBox;
}

export const analyzeWeld = async (file: File): Promise<AnalyzeWeldResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await axios.post<AnalyzeWeldResponse>(
    "https://techput-production.up.railway.app/api/analyze-weld",
    formData,
  );

  return data;
};
