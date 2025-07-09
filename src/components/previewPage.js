import { useRef } from "react";
import ResumePreview from "./resumePreview";
import DownloadPDF from "./downloadPdf";

const PreviewPage = () => {
    const resumeRef = useRef();

    return (
        <div className="flex flex-col items-center">
            <ResumePreview ref={resumeRef} />
            <DownloadPDF contentRef={resumeRef} />
        </div>
    );
};

export default PreviewPage;
