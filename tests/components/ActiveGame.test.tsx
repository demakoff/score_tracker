import { render, screen, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';

import { ActiveGameQuery, UpdateGameMutation } from '@/graphql/Game/client-entities';
import ActiveGame from '@/components/pages/ActiveGame';

describe('ActiveGame component', () => {

    beforeEach(() => {
        cleanup();
    });

    test('get rendered with spinner initially', async () => {
        const mocks = [{
            request: { query: ActiveGameQuery, },
            result: { data: { activeGame: null } }
        }];

        render(
            <MockedProvider mocks={mocks}>
                <ActiveGame />
            </MockedProvider>
        );

        expect(await screen.getByTestId('spinner')).toBeInTheDocument();
    });

    test('get rendered with start new game once no active games', async () => {
        const mocks = [{
            request: { query: ActiveGameQuery, },
            result: { data: { activeGame: null } }
        }];

        render(
            <MockedProvider mocks={mocks}>
                <ActiveGame />
            </MockedProvider>
        );

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

        expect(await screen.getByRole('button', { name: 'Start new game' })).toBeInTheDocument();
    });

    test('get rendered with active game data once it is', async () => {

        const mocks = [{
            request: { query: ActiveGameQuery, },
            result: {
                data: {
                    activeGame: {
                        id: 1,
                        createdAt: '1702827347000',
                        teamOne: { name: 'Barcelona' },
                        teamTwo: { name: 'Arsenal' },
                        teamOneScore: 5,
                        teamTwoScore: 7,
                        winner: null
                    }
                }
            }
        }];

        render(
            <MockedProvider mocks={mocks}>
                <ActiveGame />
            </MockedProvider>
        );

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

        expect(await screen.getByText('Barcelona')).toBeInTheDocument();
        expect(await screen.getByText('Arsenal')).toBeInTheDocument();
        expect(await screen.getByTestId('team-one-score').innerHTML).toBe('5');
        expect(await screen.getByTestId('team-two-score').innerHTML).toBe('7');
        expect(await screen.getAllByRole('button', { name: 'GOAL' }).length).toBe(2);
    });

    test('updates db on non-winning goal and updates the score', async () => {

        const mocks = [{
            request: { query: ActiveGameQuery },
            result: {
                data: {
                    activeGame: {
                        id: 1,
                        createdAt: '1702827347000',
                        teamOne: { name: 'Barcelona' },
                        teamTwo: { name: 'Arsenal' },
                        teamOneScore: 0,
                        teamTwoScore: 0,
                        winner: null,
                    }
                }
            }
        },
        {
            request: {
                query: UpdateGameMutation,
                variables: {
                    id: 1,
                    teamOneScore: 1,
                    teamTwoScore: 0,
                },
            },
            result: {
                data: {
                    updateGame: {
                        id: 1,
                        createdAt: '1702827347000',
                        teamOne: { name: 'Barcelona' },
                        teamTwo: { name: 'Arsenal' },
                        teamOneScore: 1,
                        teamTwoScore: 0,
                        winner: null,
                    }
                }
            }
        }];

        render(
            <MockedProvider mocks={mocks}>
                <ActiveGame />
            </MockedProvider>
        );

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

        const user = userEvent.setup();
        const teamOneGoalButton = await screen.getAllByRole('button', { name: 'GOAL' })[0];
        await user.click(teamOneGoalButton);

        expect(await screen.getByTestId('team-one-score').innerHTML).toBe('1');
    });

    test('updates db on winning goal and shows the winner', async () => {

        const mocks = [{
            request: { query: ActiveGameQuery },
            result: {
                data: {
                    activeGame: {
                        id: 1,
                        createdAt: '1702827347000',
                        teamOne: { name: 'Barcelona' },
                        teamTwo: { name: 'Arsenal' },
                        teamOneScore: 9,
                        teamTwoScore: 9,
                        winner: null,
                    }
                }
            }
        },
        {
            request: {
                query: UpdateGameMutation,
                variables: {
                    id: 1,
                    teamOneScore: 9,
                    teamTwoScore: 10,
                    winner: 'Arsenal',
                },
            },
            result: {
                data: {
                    updateGame: {
                        id: 1,
                        createdAt: '1702827347000',
                        teamOne: { name: 'Barcelona' },
                        teamTwo: { name: 'Arsenal' },
                        teamOneScore: 9,
                        teamTwoScore: 10,
                        winner: { name: 'Arsenal' },
                    }
                }
            }
        }];

        render(
            <MockedProvider mocks={mocks}>
                <ActiveGame />
            </MockedProvider>
        );

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

        const user = userEvent.setup();
        const teamTwoGoalButton = await screen.getAllByRole('button', { name: 'GOAL' })[1];
        await user.click(teamTwoGoalButton);

        expect(await screen.getByTestId('team-two-score').innerHTML).toBe('10');
        expect(await screen.getByText('"Arsenal" is a winner!')).toBeInTheDocument();
        expect(await screen.getByRole('button', { name: 'Start new game' })).toBeInTheDocument();
    });
});
