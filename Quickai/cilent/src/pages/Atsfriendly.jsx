

import React, { useState } from "react";
import { FileText } from "lucide-react";
import CountUp from "react-countup";

const ResumeChecker = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle File Upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle Resume Check
  const handleReview = () => {
    if (!file) return alert("Upload a resume first!");

    setLoading(true);

    // 🔥 Dummy API Simulation (replace with backend)
    setTimeout(() => {
      setResult({
        score: 70,
        suggestions: [
          "Add a strong summary at the top",
          "Use consistent formatting",
          "Include measurable achievements",
          "Add certifications section",
          "Use action verbs like Developed, Built"
        ],
        missing_keywords: [
          "API Gateway",
          "Docker",
          "Kubernetes",
          "Cloud Storage"
        ]
      });

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔥 MAIN CONTAINER (TOP + BOTTOM ONLY) */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* 🔝 TOP SECTION */}
        <div className="bg-white p-3 rounded-xl shadow">
          <h1 className="text-xl font-semibold mb-2">
            ATS Friendly Resume Checker
          </h1>

          <p className="text-gray-500 text-sm mb-4">
            Upload your resume to see how it scores against ATS systems and get suggestions.
          </p>

          {/* File Upload */}
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-3 rounded w-full"
          />

          {/* Show File Name */}
          {file && (
            <p className="text-sm mt-2 text-gray-600">
              📄 {file.name}
            </p>
          )}

          {/* Button */}
          <button
            onClick={handleReview}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
          >
            Review Resume
          </button>
        </div>
{/* 

 */}
 
 <div className=" bg-white p-3 rounded-xl shadow ">
  <div className="text-xl font-semibold mb-2">

    {/* Header */}
    <h1 className="text-xl font-semibold flex items-center gap-2">
      <FileText className="text-green-500" />
      Results
      <span className="text-sm text-green-600">(ATS Analysis)</span>
    </h1>

    {/* Loading */}
    {loading && (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
        <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-gray-600">Analyzing...</p>
      </div>
    )}

    {/* Empty */}
    {!result && !loading && (
      <div className="flex items-center justify-center h-32 text-gray-400 text-center">
       <span className="bg-gradient-to-r from-green-500 via-orange-500 to-blue-500 bg-clip-text text-transparent font-bold">
          Upload resume and click , Review Resume to see results here.
</span> 
      </div>
    )}

    {/* Result */}
    {result && (
      <div className="mt-4">

        {/* Score */}
        <div className="text-center">
          <p className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full inline-block">
            ATS Score
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            <CountUp end={result.score} duration={2} suffix="%" />
          </h2>
        </div>

        {/* Suggestions */}
        <div className="mt-4">
          <h3 className="font-semibold text-sm">Suggestions</h3>
          <ul className="list-disc ml-5 text-sm text-gray-600 mt-1 space-y-1">
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Keywords */}
        <div className="mt-4">
          <h3 className="font-semibold text-sm">Missing Keywords</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {result.missing_keywords.map((k, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 rounded text-xs">
                {k}
              </span>
            ))}
          </div>
        </div>

      </div>
    )}

  </div>
</div>



      </div>
    </div>
  );
};

export default ResumeChecker;