"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type AnalysisResult = {
  color: string;
  consistency: string;
  concerns: string[];
  recommendation: "monitor" | "see_vet_soon" | "emergency";
  summary: string;
};

const recommendationConfig = {
  monitor: { label: "Monitor at Home", color: "#63CC79", emoji: "✅" },
  see_vet_soon: { label: "See a Vet Soon", color: "#FBE64D", emoji: "⚠️" },
  emergency: { label: "Emergency - See Vet Now", color: "#F30E15", emoji: "🚨" },
};

export default function PoopCheck() {
  const [image, setImage] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string>("image/jpeg");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setMediaType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setImage(base64);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: image, mediaType }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const rec = result ? recommendationConfig[result.recommendation] : null;

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div style={{ backgroundColor: "#205FCC" }} className="py-6 px-6 text-center">
        <h1 className="text-2xl font-bold text-white">💩 Poop Check</h1>
        <p className="text-blue-100 text-sm mt-1">AI-powered pet stool health analysis</p>
      </div>
      <div className="max-w-md mx-auto px-6 py-8">
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all"
          style={{ borderColor: isDragActive ? "#205FCC" : "#e5e7eb", backgroundColor: isDragActive ? "#f0f5ff" : "#fafafa" }}
        >
          <input {...getInputProps()} />
          {image ? (
            <img src={`data:${mediaType};base64,${image}`} alt="uploaded" className="mx-auto rounded-xl max-h-48 object-contain" />
          ) : (
            <>
              <div className="text-5xl mb-3">📷</div>
              <p className="font-semibold text-gray-700">Drag & drop or click to upload</p>
              <p className="text-sm text-gray-400 mt-1">JPG, PNG, HEIC supported</p>
            </>
          )}
        </div>
        {image && (
          <button
            onClick={analyze}
            disabled={loading}
            className="w-full mt-4 py-4 rounded-2xl font-bold text-white text-lg transition-all"
            style={{ backgroundColor: loading ? "#93a3c8" : "#205FCC" }}
          >
            {loading ? "Analyzing..." : "🔍 Start AI Analysis"}
          </button>
        )}
        {error && <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>}
        {result && rec && (
          <div className="mt-6 space-y-4">
            <div
              className="p-4 rounded-2xl text-center font-bold text-lg"
              style={{ backgroundColor: rec.color, color: rec.color === "#FBE64D" ? "#333" : "white" }}
            >
              {rec.emoji} {rec.label}
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Color</span>
                <span className="font-semibold text-sm">{result.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Consistency</span>
                <span className="font-semibold text-sm">{result.consistency}</span>
              </div>
              {result.concerns.length > 0 && (
                <div>
                  <span className="text-gray-500 text-sm">Concerns</span>
                  <ul className="mt-1 space-y-1">
                    {result.concerns.map((c, i) => (
                      <li key={i} className="text-sm text-red-500">• {c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>
            </div>
            <button
              onClick={() => { setImage(null); setResult(null); }}
              className="w-full py-3 rounded-2xl border-2 font-semibold text-gray-600 text-sm"
              style={{ borderColor: "#e5e7eb" }}
            >
              Analyze Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}