import Button from '@c/input/Button';
import { findStudentById, TeamSlice } from '@s/teamSlice';
import { RootState, useAppDispatch, useAppSelector } from '@s/store';
import { updateAssessee } from '@s/assessSlice';
import { useNavigate } from 'react-router-dom';

function SelectTeammate() {
  const team: TeamSlice = useAppSelector((state: RootState) => state.team);
  const userId = useAppSelector((state) => state.user.id)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAssessClick = (id: number, state: TeamSlice) => {
    console.log('Assessing Student:', id);
    const student = findStudentById(state, id);
    if (student) {
      dispatch(updateAssessee({ studentId: student.studentId, firstName: student.name.split(" ")[0], lastName: student.name.split(" ")[1], id: student.id }))
      navigate('/assess')
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-2xl font-bold mb-6">Assess Your Teammates</h1>
      {team.students.filter(student => student.id != userId).map(student => (
        <div key={student.id} className="mb-6 p-4 bg-white rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{student.name}</h2>
              <p className="text-sm text-gray-500">ID: {student.studentId}</p>
              {student.teamName && (
                <p className="text-sm text-gray-500">Team: {student.teamName}</p>
              )}
              <p className="text-sm text-gray-500">Average Grade: {student.averageGrade}</p>
            </div>
            <Button
              text="Assess"
              handleClick={() => handleAssessClick(student.id, team)} //
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SelectTeammate;
