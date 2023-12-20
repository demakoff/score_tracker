export type Game = {
    id: number;
    createdAt: Date;
    teamOneName: string;
    teamTwoName: string;
    teamOneScore: number;
    teamTwoScore: number;
    winner?: string;
};

export type CreateGameRequestData = {
    teamOneName: Game['teamOneName'];
    teamTwoName: Game['teamTwoName'];
    teamOneScore?: Game['teamOneScore'];
    teamTwoScore?: Game['teamTwoScore'];
    winner?: Game['winner'];

}

export type UpdateGameRequestData = Pick<Game, 'id' | 'teamOneScore' | 'teamTwoScore' | 'winner'>;
