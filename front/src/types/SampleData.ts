import { Team } from "./types";

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
export const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'TeamView', to: '/teamview' },
  { label: 'Student Management', to: '/student-management' },
  { label: 'SMS Management', to: '/sms-management' },
  { label: 'General Settings', to: '/settings' },
  {
    label: 'Switch Account',
    to: '/begin',
    onClick: () => console.log('Switch Account clicked'),
  },
  {
    label: 'Logout',
    to: '/welcome',
    onClick: () => console.log('Logout clicked'),
  },
];

export const sidebarItemsStudents = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'TeamView', to: '/teamview' },
  { label: 'Student Management', to: '/student-management' },
  { label: 'SMS Management', to: '/sms-management' },
  { label: 'General Settings', to: '/settings' },
  {
    label: 'Switch Account',
    to: '/begin',
    onClick: () => console.log('Switch Account clicked'),
  },
  {
    label: 'Logout',
    to: '/welcome',
    onClick: () => console.log('Logout clicked'),
  },
];