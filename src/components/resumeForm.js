import { useState } from "react";
import { useResume } from "./resumeContext";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker";



function parseSkillInput(inputText) {
    const lines = inputText.split("\n");
    const skillData = {};

    lines.forEach((line) => {
        const [category, skills] = line.split(":");
        if (category && skills) {
            skillData[category.trim()] = skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
        }
    });

    return skillData;
}

const ResumeForm = () => {
    const { resumeData, updateSection } = useResume();
    const [personal, setPersonal] = useState(resumeData.personal);
    const [skillInput, setSkillInput] = useState(() => {
        const skillLines = Object.entries(resumeData.skills || {})
            .map(([category, skills]) => `${category}: ${skills.join(", ")}`);
        return skillLines.join("\n");
    });
      
    const [experienceList, setExperienceList] = useState(resumeData.experience || []);
    const [educationList, setEducationList] = useState(resumeData.education || []);

    const handleAddExperience = () => {
        setExperienceList([...experienceList, { company: "", title: "", startDate: "", endDate: "", description: "" }]);
    };

    const handleAddEducation = () => {
        setEducationList([...educationList, { institution: "", degree: "", startDate: "", endDate: "", location: "" }]);
    };
    const handleSave = () => {
        const parsedSkills = parseSkillInput(skillInput);
        updateSection("skills", parsedSkills);
        updateSection("personal", personal);
        updateSection("experience", experienceList);
        updateSection("education", educationList);
       
        console.log("🔁 Saving to context:", {
            personal,
            skills: parsedSkills,
            experienceList,
            educationList,
        });
    };

    const handleChange = (e) => {
        setPersonal({ ...personal, [e.target.name]: e.target.value });
    };

    const handlePDFUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const typedarray = new Uint8Array(reader.result);
            const pdf = await pdfjsLib.getDocument(typedarray).promise;

            let text = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map((item) => item.str).join(" ") + " ";
            }

            // 👇 Parse basic fields
            const nameMatch = text.match(/name[:\s]*([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/i);
            const emailMatch = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
            const phoneMatch = text.match(/(?:\+91)?[\s-]?\d{10}/);
            const linkedinMatch = text.match(/linkedin\.com\/[^\s)]+/i);
            const websiteMatch = text.match(/(https?:\/\/)?(www\.)?[a-z0-9.-]+\.[a-z]{2,}/i);
            const skillsMatch = text.match(/skills?\s*[:\-]?\s*([a-zA-Z0-9,.\s]+)/i);

            setPersonal((prev) => ({
                ...prev,
                name: nameMatch?.[1] || prev.name,
                email: emailMatch?.[0] || prev.email,
                phone: phoneMatch?.[0] || prev.phone,
                website: websiteMatch?.[0] || prev.website,
                linkedin: linkedinMatch?.[0] || prev.linkedin,
            }));

            if (skillsMatch?.[1]) {
                setSkillInput(skillsMatch[1].trim());
            }

            console.log("🧠 Extracted text:", text);
        };

        reader.readAsArrayBuffer(file);
    };
    

    return (
        <div className="space-y-4 p-4 bg-white rounded shadow">
            <div className="mb-4">
                <label className="font-semibold block mb-1">📎 Upload PDF Resume (Auto-fill)</label>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePDFUpload}
                    className="border p-2 rounded w-full"
                />
            </div>
            <h2 className="text-xl font-bold">Personal Info</h2>
            {["name", "email", "phone", "website", "linkedin"].map((field) => (
                <input
                    key={field}
                    name={field}
                    value={personal[field]}
                    onChange={handleChange}
                    placeholder={field}
                    className="border w-full p-2 rounded mb-2"
                />
            ))}

            <h2 className="text-xl font-bold mt-4">Skills (Categorized)</h2>
            <textarea
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder={`Enter skills like:\nFrontend: React, Tailwind\nBackend: Node.js, GraphQL\nDevOps: Docker`}
                className="border w-full p-2 rounded h-64 font-mono"
            />
            <h2 className="text-xl font-bold mt-6">Experience</h2>
            {experienceList.map((exp, index) => (
                <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
                    <input type="text" placeholder="Company" className="border w-full p-2 rounded mb-2" value={exp.company}
                        onChange={(e) => {
                            const updated = [...experienceList];
                            updated[index].company = e.target.value;
                            setExperienceList(updated);
                        }}
                    />
                    <input type="text" placeholder="Title" className="border w-full p-2 rounded mb-2" value={exp.title}
                        onChange={(e) => {
                            const updated = [...experienceList];
                            updated[index].title = e.target.value;
                            setExperienceList(updated);
                        }}
                    />
                    <input type="text" placeholder="Location" className="border w-full p-2 rounded mb-2" value={exp.location}
                        onChange={(e) => {
                            const updated = [...experienceList];
                            updated[index].location = e.target.value;
                            setExperienceList(updated);
                        }}
                    />
                    <input type="text" placeholder="Start Date" className="border w-full p-2 rounded mb-2" value={exp.startDate}
                        onChange={(e) => {
                            const updated = [...experienceList];
                            updated[index].startDate = e.target.value;
                            setExperienceList(updated);
                        }}
                    />
                    <input type="text" placeholder="End Date" className="border w-full p-2 rounded mb-2" value={exp.endDate}
                        onChange={(e) => {
                            const updated = [...experienceList];
                            updated[index].endDate = e.target.value;
                            setExperienceList(updated);
                        }}
                    />
                    <textarea placeholder="Description" className="border h-64 w-full p-2 rounded mb-2" value={exp.description}
                        onChange={(e) => {
                            const updated = [...experienceList];
                            updated[index].description = e.target.value;
                            setExperienceList(updated);
                        }}
                    />
                </div>
            ))}
            <button onClick={handleAddExperience} className="bg-green-600 text-white px-3 py-1 rounded">
                + Add Experience
            </button>

            <h2 className="text-xl font-bold mt-6">Education</h2>
            {educationList.map((edu, index) => (
                <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
                    <input type="text" placeholder="Institution" className="border w-full p-2 rounded mb-2" value={edu.institution}
                        onChange={(e) => {
                            const updated = [...educationList];
                            updated[index].institution = e.target.value;
                            setEducationList(updated);
                        }}
                    />
                    <input type="text" placeholder="Degree" className="border w-full p-2 rounded mb-2" value={edu.degree}
                        onChange={(e) => {
                            const updated = [...educationList];
                            updated[index].degree = e.target.value;
                            setEducationList(updated);
                        }}
                    />
                    <input type="text" placeholder="Start Date" className="border w-full p-2 rounded mb-2" value={edu.startDate}
                        onChange={(e) => {
                            const updated = [...educationList];
                            updated[index].startDate = e.target.value;
                            setEducationList(updated);
                        }}
                    />
                    <input type="text" placeholder="End Date" className="border w-full p-2 rounded mb-2" value={edu.endDate}
                        onChange={(e) => {
                            const updated = [...educationList];
                            updated[index].endDate = e.target.value;
                            setEducationList(updated);
                        }}
                    />
                    <input type="text" placeholder="Location" className="border w-full p-2 rounded mb-2" value={edu.location}
                        onChange={(e) => {
                            const updated = [...educationList];
                            updated[index].location = e.target.value;
                            setEducationList(updated);
                        }}
                    />
                </div>
            ))}
            <button onClick={handleAddEducation} className="bg-green-600 text-white px-3 py-1 rounded">
                + Add Education
            </button>

            <div><button
                className="bg-blue-600 text-white px-10 py-2 rounded mt-4"
                onClick={handleSave}
            >
                Save
            </button>
            </div>
        </div>
    );
};

export default ResumeForm;
