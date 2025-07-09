import { NavLink } from "react-router-dom";

const Navbar = () => {
    const navClass = ({ isActive }) =>
        `px-4 py-2 rounded ${isActive ? "bg-blue-600 text-white" : "text-gray-700"}`;

    return (
        <>
            {/* Inline style to hide .no-print elements when printing */}
            <style>
                {`@media print {
                    .no-print {
                        display: none !important;
                    }
                }`}
            </style>

            <nav className="flex gap-4 p-4 bg-white shadow mb-4 no-print">
                <NavLink to="/form" className={navClass}>Form</NavLink>
                <NavLink to="/preview" className={navClass}>Preview</NavLink>
                <NavLink to="/ats-checker" className={navClass}>ATS Score</NavLink>
                <NavLink to="/templates" className={navClass}>Templates</NavLink>
            </nav>
        </>
    );
};

export default Navbar;
