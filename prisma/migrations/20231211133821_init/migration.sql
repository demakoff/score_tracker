CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL UNIQUE,
	
	CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamOne" INTEGER REFERENCES "Team",
    "teamTwo" INTEGER REFERENCES "Team",
    "teamOneScore" SMALLINT NOT NULL DEFAULT 0,
    "teamTwoScore" SMALLINT NOT NULL DEFAULT 0,
    "winner" INTEGER REFERENCES "Team",

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "TeamOneScore_up_to_10" CHECK ("teamOneScore" >= 0 AND "teamOneScore" <= 10),
    CONSTRAINT "TeamTwoScore_up_to_10" CHECK ("teamTwoScore" >= 0 AND "teamTwoScore" <= 10),
    CONSTRAINT "Different_team_names" CHECK ("teamOne" <> "teamTwo"),
    CONSTRAINT "Only_one_winner" CHECK (NOT ("teamOneScore" = 10 AND "teamTwoScore" = 10))
);
