import { useState, type ChangeEvent } from "react";
import { analyzeWeld, type AnalyzeWeldResponse } from "./analyzeWeld";
import type { AxiosError } from "axios";

export default function WeldAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState<AnalyzeWeldResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Сначала выбери изображение");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await analyzeWeld(file);
      setResult(data);
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      setError(
        error.response?.data?.error ||
          "Не удалось проанализировать изображение",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Анализ сварного шва</h1>

      <input type="file" accept="image/*" onChange={handleChange} />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full max-h-100 object-contain rounded-xl border"
        />
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
      >
        {loading ? "Анализ..." : "Запустить анализ"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="border rounded-xl p-4 space-y-2">
          <p>
            <b>Есть дефект:</b> {result.hasDefect ? "Да" : "Нет"}
          </p>
          <p>
            <b>Тип дефекта:</b> {result.defectType}
          </p>
          <p>
            <b>Серьёзность:</b> {result.severity}
          </p>
          <p>
            <b>Уверенность:</b> {result.confidence}
          </p>
          <p>
            <b>Комментарий:</b> {result.comment}
          </p>
          <p>
            <b>Рекомендация:</b> {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}
