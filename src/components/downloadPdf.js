import { useReactToPrint } from "react-to-print";

const DownloadPDF = ({ contentRef }) => {
    const handlePrint = useReactToPrint({
        contentRef
    });

    return (
        <div className="mt-4 flex justify-center">
            <button
                onClick={handlePrint}
                className="bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
                Download PDF
            </button>
        </div>
    );
};

export default DownloadPDF;
