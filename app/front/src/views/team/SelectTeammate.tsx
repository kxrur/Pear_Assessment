import Button from '@c/input/Button';
import { findStudentById, TeamSlice } from '@s/teamSlice';
import { RootState, useAppDispatch, useAppSelector } from '@s/store';
import { updateAssessee } from '@s/assessSlice';
import { useNavigate } from 'react-router-dom';
import { Student } from '@t/types';
import { fetchNonEvaluatedStudents } from '@s/allStudentsSlice';
import { useEffect } from 'react';

function SelectTeammate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const team: TeamSlice = useAppSelector((state: RootState) => state.team);
  const userId = useAppSelector((state) => state.user.id)
  const students: Student[] = team.students.filter(student => student.id != userId);
  const nonEvaluatedStudents: Student[] = useAppSelector((state) => state.allStudents.nonEvaluatedStudents)
  useEffect(() => {
    if (team.id && userId) {
      dispatch(fetchNonEvaluatedStudents({ teamId: team.id, evaluatorId: userId }));
    }
  }, [team.id, userId]);

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
      {students.map(student => {
        const isEvaluable = nonEvaluatedStudents.some(nonEvalStudent => nonEvalStudent.id === student.id);
        return (
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
                handleClick={() => handleAssessClick(student.id, team)}
                disabled={!isEvaluable}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SelectTeammate;
