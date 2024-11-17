import React, { useState } from "react";

import Header from '@c/ui/table/Header';
import SideBarStudent from "@c/navBar/SideBarStudent.tsx";
import { sidebarItemsStudents } from "@t/SampleData.ts";
import DiceRoller from "./DiceRoller";

function GamblePage({ teamId }: { teamId: number }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [diceResult, setDiceResult] = useState<number | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRoll = (result: number) => {
    setDiceResult(result);
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8 bg-[#FAF9F6]">
        <div className="text-center text-2xl font-semibold my-4">ROLL THE DICE</div>
        <div className="flex flex-col items-center space-y-4">
          {/* Pass the handleRoll function as the onRoll prop */}
          <DiceRoller onRoll={handleRoll} teamId={teamId} />
          {diceResult !== null && (
            <div className="text-xl mt-4">
              You rolled: <span className="font-bold">{diceResult}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamblePage;
