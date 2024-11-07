import React, { useState } from "react";

import Header from '@c/ui/table/Header';
import SideBarStudent from "@c/navBar/SideBarStudent.tsx";
import {sidebarItemsStudents} from "@t/SampleData.ts";

const GamblePage: React.FC = () => {
    const [dice, setDice] = useState<number | null>(null);

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 12) + 1;
        setDice(roll);
    };
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="flex">
            <SideBarStudent items={sidebarItemsStudents} />
            <div className="flex-1 p-8 bg-[#FAF9F6]">
                <Header searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
                <div className="text-center text-2xl font-semibold my-4">ROLL THE DICE</div>
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={rollDice}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                    >
                        Roll Dice
                    </button>
                    {dice !== null && (
                        <div className="text-xl mt-4">
                            You rolled: <span className="font-bold">{dice}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GamblePage;
