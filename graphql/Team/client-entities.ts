import { gql } from '@apollo/client';

export const GetAllTeamsQuery = gql`
    query GetAllTeams {
        teams {
            id,
            name,
        }
}    
`;

export const CreateTeamMutation = gql`
    mutation CreateTeam($name: String!) {
        createTeam(name: $name) 
        {
            id
        }
    }
`;
