import React from "react";
import { useResume } from "./resumeContext";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaLinkedin, FaGlobe } from "react-icons/fa";


const ResumePreview = React.forwardRef((_, ref) => {
    const { resumeData } = useResume();
    const { personal, skills, experience, education } = resumeData;

    return (
        <div ref={ref} className="bg-white text-gray-900 px-8 pt-4 pb-1  w-[210mm] mx-auto text-sm font-sans">
         
            <div className="pb-1 mb-1">
                <h1 className="text-center text-3xl font-bold uppercase tracking-wide">{personal.name}</h1>
                <div className="flex flex-wrap gap-x-4 text-sm justify-center items-center">
                    {personal.phone && (
                        <span className="flex items-center gap-1">
                            <MdPhone className="text-blue-600" />
                            {personal.phone}
                        </span>
                    )}
                    {personal.email && (
                        <a href={`mailto:${personal.email}`} className="flex items-center gap-1 text-blue-700 underline">
                            <MdEmail />
                            {personal.email}
                        </a>
                    )}
                    {personal.linkedin && (
                        <a href={`https://${personal.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-700 underline">
                            <FaLinkedin />
                            {personal.linkedin}
                        </a>
                    )}
                    {personal.website && (
                        <a href={`https://${personal.website.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-700 underline">
                            <FaGlobe />
                            {personal.website}
                        </a>
                    )}
                </div>
            </div>


            {skills && Object.keys(skills).length > 0 && (
                <>
                    <h2 className="text-lg font-semibold border-b pb-1  mb-1">Technical Skills</h2>
                    <ul className="space-y-[1px] list-disc list-inside text-sm">
                        {Object.entries(skills).map(([category, items]) => (
                            items.length > 0 && (
                                <li key={category}>
                                    <span className="font-medium">{category}:</span> {items.join(", ")}
                                </li>
                            )
                        ))}
                    </ul> 
                </>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
                <>
                    <h2 className="text-lg font-semibold border-b pb-1 mt-1 mb-1">Experience / Projects</h2>
                    {experience.map((exp, idx) => (
                        <div key={idx} className="mb-2" >
                            <div className="flex w-full justify-between font-semibold text-sm">
                                <span>{exp.title}</span>
                                <span className="italic">{exp.startDate} – {exp.endDate}</span>
                            </div>
                            <div className="flex w-full justify-between italic text-sm mb-[2px]">
                                <span>{exp.company}</span>
                                <span>{exp.location}</span>
                            </div>
                            <ul className="list-disc list-outside pl-5 text-sm text-gray-800 space-y-[1px]">
                                {exp.description
                                    .split("•")
                                    .filter(Boolean)
                                    .map((point, i) => (
                                        <li
                                            key={i}
                                            dangerouslySetInnerHTML={{
                                                __html: point
                                                    .trim()
                                                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                                            }}
                                        />
                                    ))}
                            </ul>
                        </div>
                    ))}
                </>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <>
                    <h2 className="text-lg font-semibold border-b pb-1 mt-1 mb-1">Education</h2>
                    {education.map((edu, idx) => (
                        <div key={idx} className="mb-3">
                            <div className="flex justify-between font-semibold w-full">
                                <p>{edu.degree}</p>
                                <p className="italic">{edu.startDate} – {edu.endDate}</p>
                            </div>
                            <div className="flex justify-between italic text-sm text-gray-700 w-full">
                                <p>{edu.institution}</p>
                                <p>{edu.location}</p>
                            </div>
                        </div>
                    ))}

                </>
            )}
        </div>
    );
});

export default ResumePreview;
