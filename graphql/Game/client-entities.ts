import { gql } from '@apollo/client';

export const ActiveGameQuery = gql`
query GetActiveGame{
    activeGame {
        id,
        createdAt,
        teamOneName,
        teamTwoName,
        teamOneScore,
        teamTwoScore,
        winner
    }
}    
`;

export const CreateGameMutation = gql`
    mutation CreateGame($teamOneName: String!, $teamTwoName: String!) {
        createGame(teamOneName: $teamOneName, teamTwoName: $teamTwoName) {
            id
        }
    }
`;

export const UpdateGameMutation = gql`
mutation UpdateGame($id: Int!, $teamOneScore: Int!, $teamTwoScore: Int!, $winner: String) {
    updateGame(id: $id, teamOneScore: $teamOneScore, teamTwoScore: $teamTwoScore, winner: $winner) {
        id,
        createdAt,
        teamOneName,
        teamTwoName,
        teamOneScore,
        teamTwoScore,
        winner
    }
}
`;
