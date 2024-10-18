import { useAppSelector } from "@s/store";

//TODO:-BE get the student average for the column in the StudentManagement table
export function getStudentAverage() {

}

// don't ask me why 'G' is a capital (trust)
export function GetCurrentUser() {
  return useAppSelector((state) => state.user);
}
