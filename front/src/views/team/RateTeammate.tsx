import React, { useState, useEffect } from 'react';
import { Student } from '@t/types';
import Button from '@c/input/Button';
import StarRating from '@c/ui/table/StarRating';
import { fetchTeammates } from '@f/student';

function SelectTeammate() {
  const [students, setStudents] = useState<Student[]>([]);
  const [ratings, setRatings] = useState<{ studentId: string; rating: number }[]>([]);

  useEffect(() => {
    const loadStudents = async () => {
      const fetchedStudents = await fetchTeammates();
      setStudents(fetchedStudents);
      setRatings(fetchedStudents.map(student => ({ studentId: student.studentId, rating: 0 })));
    };

    loadStudents();
  }, []);

  const handleRatingChange = (studentId: string, newRating: number) => {
    const updatedRatings = ratings.map(rating =>
      rating.studentId === studentId ? { ...rating, rating: newRating } : rating
    );
    setRatings(updatedRatings);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ratings Submitted:', ratings);
  };

  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-2xl font-bold mb-6">Rate Your Teammates</h1>
      <form onSubmit={handleSubmit}>
        {students.map(student => (
          <div key={student.id} className="mb-6 p-4 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{student.name}</h2>
                <p className="text-sm text-gray-500">ID: {student.studentId}</p>
              </div>
              <StarRating
                rating={ratings.find(r => r.studentId === student.studentId)?.rating ?? 0}
              />
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">Set your rating:</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`h-8 w-8 ${
                      (ratings.find(r => r.studentId === student.studentId)?.rating ?? 0) >= star
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onClick={() => handleRatingChange(student.studentId, star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
        <Button text="Submit Ratings" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" />
      </form>
    </div>
  );
}

export default SelectTeammate;
