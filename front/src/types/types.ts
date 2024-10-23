import { CheckboxProps } from "@mui/material";

export interface TeacherRegFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: [string];
}
export interface StudentRegFormData {
  firstName: string;
  lastName: string;
  studentId: number;
  username: string;
  password: string;
  confirmPassword: string;
  roles: string[];
  isTemp: boolean,
}

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
  id: number;
  name: string;
  studentId: string;
  teamName?: string; // Make teamName optional
  averageGrade: number;
}
export interface sidebarItemsStudents {
  label: string;
  to: string;
  onClick?: () => void;
}
export interface TableOfStudents {
  teamName: string;
  teamMembers: string[];
  searchTerm: string;
  addToTeam: CheckboxProps
}
