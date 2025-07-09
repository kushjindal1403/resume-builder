import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState({
        personal: {
            name: "",
            email: "",
            phone: "",
            website: "",
            linkedin: "",
        },
        skills: {}, 
        experience: [],
        education: [],
    });

    const updateSection = (section, data) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: data,
        }));
    };

    return (
        <ResumeContext.Provider value={{ resumeData, updateSection }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);

