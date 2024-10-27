import { teams } from "@t/SampleData.ts";
import { Team } from "@t/types.ts";


//TODO:-BE fetch teams of a user (student or prof) logic
export function fetchTeams(memberId: number): Team[] {
  return teams
}

export async function addTeam(team: Team) {
  try {

    // Make a POST request to the correct API endpoint
    const response = await fetch('http://localhost:8080/api/teams/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        professorID: team.professorId,
        teamName: team.teamName,
        studentIDs: team.teamMembers
      })
    });

    if (response.ok) {
      console.log('Team was created successfully:');
    } else {
      console.error('Failed to create team:', response.statusText);
    }
  } catch (error) {
    console.error('Error occurred while creating team:', error);
  }
}

//TODO:-BE delete team logic
export async function deleteTeam(team: Team) {
}
