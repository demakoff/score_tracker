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

export class TeamStat {
    id: Team['id'];
    name: Team['name'];
    gamesPlayed: number;
    wins: number;
    loses: number;
    winRatio: number;
    goalsFor: number;
    goalsAgainst: number;
    goalsDiff: number;

    constructor(
        id: Team['id'],
        name: Team['name'],
        gamesPlayed: number,
        wins: number,
        loses: number,
        winRatio: number,
        goalsFor: number,
        goalsAgainst: number,
        goalsDiff: number,
    ) {
        this.id = id;
        this.name = name;
        this.gamesPlayed = gamesPlayed;
        this.wins = wins;
        this.loses = loses;
        this.winRatio = winRatio;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.goalsDiff = goalsDiff;
    }
}
