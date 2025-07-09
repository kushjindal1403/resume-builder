import { useReactToPrint } from "react-to-print";

const DownloadPDF = ({ contentRef }) => {
    const handlePrint = useReactToPrint({
         contentRef
    });

    return (
        <>
            {/* Add this only once if not already in Navbar or App */}
            <style>
                {`@media print {
                    .no-print {
                        display: none !important;
                    }
                }`}
            </style>

            <div className="mt-4 flex justify-center no-print">
                <button
                    onClick={handlePrint}
                    className="bg-blue-700 text-white px-4 py-2 rounded shadow"
                >
                    Download PDF
                </button>
            </div>
        </>
    );
};

export default DownloadPDF;
