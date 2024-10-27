export interface Team {
  professorId: string;
  teamName: string;
  teamMembers: string[];
  teamDescription: string;
}

export interface SidebarItem {
  label: string;
  to: string;
  onClick?: () => void; // Optional function to handle clicks, e.g., for logout
}

export interface Student {
  name: string;
  studentId: string;
  teamName?: string; // Make teamName optional
  averageGrade: number;
}
export interface StudentTableProps {
  students: Student[];
  searchTerm: string;
  deleteStudent: (id: number) => void;
  updateStudents: (updatedStudents: Student[]) => void;
}
export interface ButtonOpenFileProps {
  addStudentsFromCSV: (name,id: Student[]) => void;
}
