import { CheckboxProps } from "@mui/material";

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
