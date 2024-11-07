import React, {useState} from "react";
import SideBarStudent from '@c/navBar/SideBarStudent.tsx';

import { sidebarItemsStudents } from '@t/SampleData.ts'; // Import sidebarItems here
import Header from '@c/ui/table/Header';
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const MyProfile: React.FC = () => {
    const navigate = useNavigate();

    const handleGradePageNavigation = () => {
        navigate("/gamble-grade");
    };
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="flex"><SideBarStudent items={sidebarItemsStudents} />
        <div className="flex-1 p-8 bg-[#FAF9F6]">
        <Header searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
        <div className="text-center text-2xl font-semibold my-4">MY PROFILE</div>
    <div className="flex flex-col items-center space-y-4">
    <div className="rounded-full bg-gray-200 w-20 h-20 flex items-center justify-center">
    <span className="text-4xl">👤</span>
    </div>
    <div className="text-lg">Fname Lname</div>
    <div className="w-full max-w-sm space-y-2">
    <div className="bg-red-50 rounded-md p-3 text-left">
        my team:
        </div>
        <div className="relative flex items-center justify-between bg-red-50 rounded-md p-3">
        <span>my AVG grade:</span>
    <Tooltip title="Detail View" placement="top">
    <button
        onClick={handleGradePageNavigation}
    className="rounded-full p-1 text-blue-500 hover:text-blue-700 focus:outline-none"
        >
        +
            </button>
        </Tooltip>
        </div>
        <div className="bg-red-50 rounded-md p-3 text-left">
        my professor:
        </div>
        </div>
        </div>
        </div>
        </div>
);
};

export default MyProfile;
