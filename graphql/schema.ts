export const typeDefs = `
    type Game {
        id: ID
        createdAt: String
        teamOneName: String
        teamTwoName: String
        teamOneScore: Int
        teamTwoScore: Int
        winner: String
    }

    type Query {
        activeGame: Game
    }
`;