import { NavigateButton } from "@c/input/NavigateButton";

export default function TeamsControlButtons() {
  return (
    <div className="flex row-auto">
      <NavigateButton text={'Create New Team'} path={'/create-team'}></NavigateButton>
      <NavigateButton text={'Delete a Team'} path={'/team-delete-preview'}></NavigateButton>
    </div>
  );
}
