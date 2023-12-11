-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamOneName" VARCHAR(20) NOT NULL,
    "teamTwoName" VARCHAR(20) NOT NULL,
    "scoreTeamOne" SMALLINT NOT NULL DEFAULT 0,
    "scoreTeamTwo" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ScoreTeamOne_up_to_10" CHECK ("scoreTeamOne" >= 0 AND "scoreTeamOne" <= 10),
    CONSTRAINT "ScoreTeamTwo_up_to_10" CHECK ("scoreTeamTwo" >= 0 AND "scoreTeamTwo" <= 10)
);
