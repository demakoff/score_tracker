export type Game = {
    id: number;
    createdAt: Date;
    teamOne: { name: Team['name'] };
    teamTwo: { name: Team['name'] };
    teamOneScore: number;
    teamTwoScore: number;
    winner?: { name: Team['name'] };
};

export type Team = {
    id: number;
    name: string;
}

export type CreateGameRequestData = {
    teamOne: Team['name'];
    teamTwo: Team['name'];
    teamOneScore?: Game['teamOneScore'];
    teamTwoScore?: Game['teamTwoScore'];
    winner?: Team['name'];
}

export type UpdateGameRequestData = {
    id: Team['id'];
    teamOneScore: Game['teamOneScore'];
    teamTwoScore: Game['teamTwoScore'];
    winner?: Team['name'];
}
