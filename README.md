

## How to run this project

1. Make sure you have git installed.
2. Clone repo with default `master` branch.
3. Make sure you have a Docker installed and is running.
4. Open project root folder with your terminal.
5. Run `docker compose build` in the terminal (should finish in about 1-2 mins).
6. Make sure that localhost ports `3000` (used by app) and `5432` (used by database) and free. Otherwise you will see `EADDRINUSE` error
7. Run `docker compose up -d` to run container is detached (background) mode
8. Open app with `http://localhost:3000`.
9. To provide the best UX, it's recommended to open the site in mobile view (e.g. via Chrome Devtool).


## Assumptions

1. Game is automatically get finished when one of the teams scores 10 goals.
2. Game cannot be finished unless one of the teams scores 10 goals.
3. Previously played game cannot be created if one of the team has less than 10 goals.
4. Previously played game cannot be created if both teams scores 10 goals.
5. In the current implementation Team equals Player.
6. Same team cannot be selected in both team fields on game creation.


## ToDo next:
- **[Security]** Currently docker operates as root user, which is security risk.
- **[DX, CI/CD Performance]** Leave only prod deps in Docker image (currently all deps included).
- **[Security]** Setup other (not superuser) users for DB.
- **[Security]** Improve db config with user, db name etc (currently all fields are default).
- **[Security]** Implement proper input validation.
- **[Observability, Security]** Implement proper error handling.
- **[DX]** Refine project files structure (currently it's not much organized).
- **[DX]** Split components to smaller (currently some take 100-200 lines of code).
- **[Stability]** Add more tests (currently we have only a few of integrational, just to showcase)
- **[UX]** Adapt UX to bigger screens (currently it focused on mobile view).
- **[DX, CI/CD Performance]** Add `pre-push` git hook with tests and code style check runs to validate code on the earliest stage.

## Pages

#### Game (Home)

![No active games, there are some already played](https://prnt.sc/-eWsg6ZZ_Vov)

![There is an active game, with some already played](https://prnt.sc/XeBvUIdKfJDH)

![Game finished](https://prnt.sc/xO38nuWfRCh1)

#### New Game

![New game form](https://prnt.sc/npNmXTLWvqLE)

![New game team selection](https://prnt.sc/Hsh-SpXsGRqb)

![New previously played game](https://prnt.sc/Y9a9Vx1jNm3E)


#### New Team

![New team form](https://prnt.sc/tjme7dPRjqqn)

