-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamOneName" VARCHAR(20) NOT NULL,
    "teamTwoName" VARCHAR(20) NOT NULL,
    "teamOneScore" SMALLINT NOT NULL DEFAULT 0,
    "teamTwoScore" SMALLINT NOT NULL DEFAULT 0,
    "winner" VARCHAR(20),

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "TeamOneScore_up_to_10" CHECK ("teamOneScore" >= 0 AND "teamOneScore" <= 10),
    CONSTRAINT "TeamTwoScore_up_to_10" CHECK ("teamTwoScore" >= 0 AND "teamTwoScore" <= 10),
    CONSTRAINT "Different_team_names" CHECK ("teamOneName" <> "teamTwoName"),
    CONSTRAINT "Only_one_winner" CHECK (NOT ("teamOneScore" = 10 AND "teamTwoScore" = 10))
);
