import { useNavigate } from "react-router-dom";

import { IconChevronLeft } from "@tabler/icons-react"

function AboutPage() {
    const navigate = useNavigate();
    return (
        <>
            <button className="bg-gray-200/30 rounded-3xl sm:rounded-4xl p-3 sm:p-4" onClick={() => navigate(-1)}>
                <IconChevronLeft stroke={3} size={24} className="sm:w-8 sm:h-8" />
            </button>
        </>
    )
}

export default AboutPage