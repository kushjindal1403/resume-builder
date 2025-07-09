import { useState } from "react";
import { useResume } from "./resumeContext";

const extractKeywords = (text) => {
    return text
        .toLowerCase()
        .match(/\b[a-zA-Z]{3,}\b/g) // match words of length >= 3
        ?.map((word) => word.trim()) || [];
};

const AtsChecker = () => {
    const { resumeData } = useResume();
    const [jd, setJd] = useState("");
    const [matchScore, setMatchScore] = useState(null);
    const [missingKeywords, setMissingKeywords] = useState([]);

    const handleCheck = () => {
        if (!jd.trim()) return;

        // Extract resume text
        const resumeText = `
      ${Object.values(resumeData.personal).join(" ")}
      ${Object.values(resumeData.skills || {}).flat().join(" ")}
      ${resumeData.experience.map((e) => `${e.title} ${e.company} ${e.description}`).join(" ")}
      ${resumeData.education.map((e) => `${e.degree} ${e.institution}`).join(" ")}
    `;

        const jdWords = extractKeywords(jd);
        const resumeWords = extractKeywords(resumeText);
        const resumeSet = new Set(resumeWords);

        const matched = jdWords.filter((word) => resumeSet.has(word));
        const missing = jdWords.filter((word) => !resumeSet.has(word));

        const score = Math.round((matched.length / jdWords.length) * 100);

        setMatchScore(score);
        setMissingKeywords(missing.slice(0, 20)); // show top 20
    };

    return (
        <div className="mt-6 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">📊 ATS Score Checker</h2>
            <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste job description here..."
                className="w-full h-40 border p-2 rounded mb-4"
            />
            <button onClick={handleCheck} className="bg-blue-600 text-white px-4 py-2 rounded">
                Check Match
            </button>

            {matchScore !== null && (
                <div className="mt-4">
                    <p className="text-lg font-semibold">✅ Match Score: {matchScore}%</p>
                    {missingKeywords.length > 0 && (
                        <div className="mt-2">
                            <p className="font-medium">❌ Missing Keywords:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {missingKeywords.map((word, idx) => (
                                    <li key={idx}>{word}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AtsChecker;
