import { gql } from '@apollo/client';

export const ActiveGameQuery = gql`
query GetActiveGame{
    activeGame {
        id
        createdAt
        teamOne {
          name
        }
        teamTwo {
          name
        }
        teamOneScore
        teamTwoScore
        winner {
          name
        }
    }
}    
`;

export const CreateGameMutation = gql`
    mutation CreateGame(
        $teamOne: String!, 
        $teamTwo: String!, 
        $teamOneScore: Int, 
        $teamTwoScore: Int, 
        $winner: String) 
    {
        createGame(
            teamOne: $teamOne, 
            teamTwo: $teamTwo, 
            teamOneScore: $teamOneScore, 
            teamTwoScore: $teamTwoScore, 
            winner: $winner) 
        {
            id
        }
    }
`;

export const UpdateGameMutation = gql`
mutation UpdateGame(
    $id: Int!, 
    $teamOneScore: Int!, 
    $teamTwoScore: Int!, 
    $winner: String) 
{
    updateGame(
        id: $id, 
        teamOneScore: $teamOneScore, 
        teamTwoScore: $teamTwoScore, 
        winner: $winner) 
    {
        id,
        createdAt,
        teamOne {
            name
        },
        teamTwo {
            name
        },
        teamOneScore,
        teamTwoScore,
        winner {
            name
        }
    }
}
`;
