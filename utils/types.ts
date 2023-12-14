export type Game = {
    id: number;
    createdAt: Date;
    teamOneName: string;
    teamTwoName: string;
    teamOneScore: number;
    teamTwoScore: number;
    winner?: string;
};

export type NewGame = Pick<Game, 'teamOneName' | 'teamTwoName'>;
