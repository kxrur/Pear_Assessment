import React, {useState} from "react";
import Sidebar from '@c/navBar/Sidebar';
import Header from '@c/ui/table/Header';
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GradePage: React.FC = () => {
    const navigate = useNavigate();

    const handleGamblePageNavigation = () => {
        navigate("/gamble-page");
    };
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8 bg-[#FAF9F6]">
                <Header searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
                <div className="text-center text-2xl font-semibold my-4">MY GRADE:</div>
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
                        Cooperation: 4/5
                    </div>
                    <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
                        Conceptual: 3/5
                    </div>
                    <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
                        Practical: 3.5/5
                    </div>
                    <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
                        Work ethic: 3.5/5
                    </div>
                    <div className="bg-red-50 rounded-md p-3 w-full max-w-xs text-left">
                        Total avg: 3.5/5
                    </div>
                    <div className="flex items-center space-x-2">
                        <Tooltip
                            title="As a student, you’re allowed to gamble to increase your grade. If the dice hit a 12, you gain 0.5 on your total grade. Otherwise, you lose 0.2 for each roll. Only students who have a minimum of 3/5 in all categories can gamble, otherwise, the teacher won’t approve the request. Good Luck!"
                            placement="top"
                            arrow
                            classes={{ tooltip: "bg-red-500 text-xs" }}
                        >
                            <span className="text-blue-500 cursor-pointer text-xl">ℹ️</span>
                        </Tooltip>
                        <button
                            onClick={handleGamblePageNavigation}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                        >
                            GAMBLE MY GRADE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradePage;
