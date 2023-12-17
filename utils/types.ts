export type Game = {
    id: number;
    createdAt: Date;
    teamOneName: string;
    teamTwoName: string;
    teamOneScore: number;
    teamTwoScore: number;
    winner?: string;
};

export type CreateGameRequestData = Pick<Game, 'teamOneName' | 'teamTwoName'>;

export type UpdateGameRequestData = Pick<Game, 'id' | 'teamOneScore' | 'teamTwoScore' | 'winner'>;
