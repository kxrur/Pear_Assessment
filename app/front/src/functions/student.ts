import { useAppSelector } from "@s/store";
import { Student } from '@t/types'


// Function to fetch teammates from the backend (used in views/team/SelectTeammate.tsx)
export async function fetchTeammates(): Promise<Student[]> {
  try {
    const response = await fetch('/api/teammates'); // Replace with actual backend URL
    if (!response.ok) {
      throw new Error('Failed to fetch teammates');
    }
    const data: Student[] = await response.json();
    return data; // Returning the array of students
  } catch (error) {
    console.error('Error fetching teammates:', error);
    throw error; // Rethrow error to handle it in the caller
  }
}



