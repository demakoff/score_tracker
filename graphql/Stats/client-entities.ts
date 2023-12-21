import { gql } from '@apollo/client';

export const GetTeamStatsQuery = gql`
query GetTeamStats{
    teamStats {
        id
        name
      	gamesPlayed
        wins
        loses
        winRatio
        goalsFor
        goalsAgainst
        goalsDiff
    }
}  
`;

