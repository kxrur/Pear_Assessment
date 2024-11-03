import { Team } from "./types";
import { Student } from "./types";
import {SummaryView} from "./types";

export const teams: Team[] = [
  {
    teamName: 'Team Alpha',
    teamMembers: ['Alice', 'Bob', 'Charlie'],
    teamDescription: 'A team of talented individuals working on innovative projects.',
    professorId: "",
  },
  {
    teamName: "Dev Team",
    teamMembers: ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'],
    teamDescription: "We are a team of developers working on cutting-edge technology projects. Our focus is on creating efficient, scalable, and innovative solutions. team description Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. ",
    professorId: "",
  },
  {
    teamName: 'Team Gamma',
    teamMembers: ['Grace', 'Heidi', 'Ivan'],
    teamDescription: 'Specializing in design and user experience.',
    professorId: "",
  },
  {
    teamName: 'Team Alpha',
    teamMembers: ['Alice', 'Bob', 'Charlie'],
    teamDescription: 'A team of talented individuals working on innovative projects.',
    professorId: "",
  },
  {
    teamName: 'Team Beta',
    teamMembers: ['David', 'Eve', 'Frank'],
    teamDescription: 'Focused on developing cutting-edge technology solutions.',
    professorId: "",
  },
  {
    teamName: 'Team Gamma',
    teamMembers: ['Grace', 'Heidi', 'Ivan'],
    teamDescription: 'Specializing in design and user experience.',
    professorId: "",
  },
];
export const summaryData: SummaryView[] = [
  {
    studentId: '402XXXXX',
    lastName: 'Doe',
    firstName: 'John',
    teamName: 'Invincibles',
    cooperation: { stars: 1.4, comment: "Good teamwork" },
    conceptual: { stars: 1.4, comment: "Solid understanding" },
    practical: { stars: 1.8, comment: "Excellent execution" },
    workEthic: { stars: 1.8, comment: "Consistently high effort" },
    averageGrade: 1.6,
    peersResponded: 5,
  },
  {
    studentId: '403XXXXX',
    lastName: 'Smith',
    firstName: 'Jane',
    teamName: 'Innovators',
    cooperation: { stars: 4.0, comment: "Excellent collaborator" },
    conceptual: { stars: 4.5, comment: "Good grasp of concepts" },
    practical: { stars: 4.5, comment: "Very practical approach" },
    workEthic: { stars: 4.2, comment: "Strong commitment" },
    averageGrade: 4.03,
    peersResponded: 4,
  },
  {
    studentId: '404XXXXX',
    lastName: 'Johnson',
    firstName: 'Emily',
    teamName: 'Achievers',
    cooperation: { stars: 4.5, comment: "Needs improvement in collaboration" },
    conceptual: { stars: 3.0, comment: "Average understanding" },
    practical: { stars: 3.8, comment: "Meets basic expectations" },
    workEthic: { stars: 3.2, comment: "Shows potential" },
    averageGrade: 3.88,
    peersResponded: 3,
  },
  // Add more entries as needed
];

export const students: Student[] = [
  {
    id: 1,
    name: 'Franck Doumbé',
    studentId: 'S001',
    teamName: 'Team Alpha',
    averageGrade: 89,
  },
  {
    id: 2,
    name: 'Zakariya Sousa Oudina',
    studentId: 'S002',
    teamName: 'Team Alpha',
    averageGrade: 76,
  },
  {
    id: 3,
    name: 'Charlie Nguyen',
    studentId: 'S003',
    teamName: 'Team Alpha',
    averageGrade: 92,
  },
  {
    id: 4,
    name: 'Mathieu Patel',
    studentId: 'S004',
    teamName: 'Team Alpha',
    averageGrade: 85,
  },
  {
    id: 5,
    name: 'Daniel Dey',
    studentId: 'S005',
    teamName: 'Team Alpha',
    averageGrade: 95,
  },
];


export const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'TeamView', to: '/team-preview' },
  { label: 'Student Management', to: '/student-management' },
  { label: 'Summary', to: '/summary' },
  { label: 'General Settings', to: '/settings' },
  {
    label: 'Switch Account',
    to: '/welcome',
    onClick: () => console.log('Switch Account clicked'),
  },
  {
    label: 'Logout',
    to: '/welcome',
    onClick: () => console.log('Logout clicked'),
  },
];

