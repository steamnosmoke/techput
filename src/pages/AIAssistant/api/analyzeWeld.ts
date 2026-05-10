import axios from "axios";

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WeldDefect {
  defectType: string;
  severity: "low" | "medium" | "high" | "unknown";
  confidence: number;
  comment: string;
  recommendation: string;
  box?: BoundingBox;
}

export interface AnalyzeWeldResponse {
  hasDefect: boolean;

  // новый массив дефектов
  defects: WeldDefect[];

  // совместимость со старым UI
  defectType?: string;
  severity?: "low" | "medium" | "high" | "unknown";
  confidence?: number;
  comment?: string;
  recommendation?: string;
  box?: BoundingBox;
}

export const analyzeWeld = async (file: File): Promise<AnalyzeWeldResponse> => {
  const formData = new FormData();

  formData.append("image", file);

  const { data } = await axios.post<AnalyzeWeldResponse>(
    "https://techput-production-7a9e.up.railway.app/api/analyze-weld",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};
