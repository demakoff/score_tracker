

## How to run this project

1. Make sure you have git installed.
2. Clone repo with default `master` branch.
3. Make sure you have a Docker installed and is running.
4. Open project root folder with your terminal.
5. Run `docker compose build` in the terminal (may take about 2-4 mins).
6. Make sure that localhost ports `3000` (used by app) and `5432` (used by database) and free. Otherwise you will see `EADDRINUSE` error
7. Run `docker compose up -d` to run container is detached (background) mode
8. Open the app with `http://localhost:3000`. The first cold run may take some additional time (up to 1 min).
9. To explore API, please visit `http://localhost:3000/api/graphql`
10. To provide the best UX, it's recommended to open the site in mobile view (e.g. via Chrome Devtool).
   


## Assumptions

1. Game is automatically get finished when one of the teams scores 10 goals.
2. Game cannot be finished unless one of the teams scores 10 goals.
3. Previously played game cannot be created if one of the team has less than 10 goals.
4. Previously played game cannot be created if both teams scores 10 goals.
5. In the current implementation Team equals Player.
6. Same team cannot be selected in both team fields on game creation.


## Tech stack
- "React" as a components library
- "TailwindCSS" for styling
- "NextUI" React UI components library
- "Next.js" as a Node.js backend framework
- "Typescript" for types
- "Jest" for testing
- "GraphQL" - data transport
- "GraphQL-Yoga" - GraphQL server
- "Apollo-Client" - GraphQL client
- "Pothos" - Typescript schema builder
- PostgreSQL - relational database management system
- "Prisma" - ORM for PostgreSQL
- Docker - containerization tool


## ToDo next
- **[Security]** Currently docker operates as root user, which is security risk.
- **[DX, CI/CD Performance]** Leave only prod deps in Docker image (currently all deps included).
- **[Security]** Setup other (not superuser) users for DB.
- **[Security]** Improve db config with user, db name etc (currently all fields are default).
- **[Security]** Implement proper input validation (currently it's very basic).
- **[Observability, Security]** Implement proper error handling.
- **[DX]** Refine project files structure (currently it's not much organized).
- **[DX]** Split components to smaller (currently some take 100-200 lines of code).
- **[Stability]** Add more tests (currently we have only a few of integrational, just to showcase)
- **[UX]** Adapt UX to bigger screens (currently it focused on mobile view).
- **[DX, CI/CD Performance]** Add `pre-push` git hook with tests and code style check runs to validate code on the earliest stage.


## Pages

#### Game (Home)

No active games, there are some already played:

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/59155104-7de7-4086-9e35-6626e99f0c87">


There is an active game, with some already played:

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/ff668f71-78e3-4cfb-809c-0d612dd30fbe">


Game finished:

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/f80f329b-d65f-4d49-8de0-479ab7a906c0">



#### New Game

New game form:

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/8027f638-68b7-4352-a45c-e2c2b3e4f739">


New game team selection:

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/572291dd-ea67-45f1-ae36-3d646262535c">


New previously played game: 

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/cd3e43d5-ea74-4c41-8a79-314547c57fb8">



#### New Team

New team form:

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/d50c1e6c-42cd-48b8-b4a8-1d55b9148bc0">



#### Dashboard

Teams table:

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/179d6c90-8706-4540-968c-ac4543682299">


Selected team finished games:

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/bafdc488-58bc-4576-b5ae-fa781daea502">


Two teams' confrontational statistics:

<img height="400" alt="image" src="https://github.com/demakoff/score_tracker/assets/5207710/eb9def1e-1763-43d3-9813-8dd03f8d9b21">

