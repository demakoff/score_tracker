'use client';

import React, { useState } from 'react';
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue, Selection } from '@nextui-org/react';
import { useQuery } from '@apollo/client';

import type { Game, TeamStat } from '@/utils/types';
import { GetTeamStatsQuery } from '@/graphql/Stats/client-entities';
import { GetGamesQuery } from '@/graphql/Game/client-entities';
import GamesList from '../GamesList';

const columns = [
    {
        key: 'name',
        label: 'NAME',
    },
    {
        key: 'gamesPlayed',
        label: 'G',
    },
    {
        key: 'wins',
        label: 'W',
    },
    {
        key: 'loses',
        label: 'L',
    },
    {
        key: 'winRatio',
        label: 'WR',
    },
    {
        key: 'goalsFor',
        label: 'GF',
    },
    {
        key: 'goalsAgainst',
        label: 'GA',
    },
    {
        key: 'goalsDiff',
        label: 'GD',
    },
];

export default function Dashboard() {

    const [selectedTeams, setselectedTeams] = React.useState<Selection>(new Set([]));

    const [selectedTeamGamesData, setSelectedTeamGamesData] = useState<Game[]>();
    const [confrontationResult, setConfrontationResult] = useState<string>('');

    const {
        refetch
    } = useQuery<{ games: Game[] }>(GetGamesQuery, {
        fetchPolicy: 'network-only',
        skip: true,
    });

    const {
        data: teamStatsData,
        loading,
    } = useQuery<{ teamStats: TeamStat[] }>(GetTeamStatsQuery, {
        fetchPolicy: 'network-only',
    });

    if (loading) return (<Spinner data-testid="spinner" size="lg" className="mt-40" color="primary" />);

    const rows = teamStatsData?.teamStats;
    const handleTeamSelection = async (keys: Selection) => {
        const teamIds = Array.from(keys);

        if (teamIds.length > 2) return;

        setselectedTeams(keys);

        if (!teamIds.length) {
            setSelectedTeamGamesData(undefined);
            setConfrontationResult('');
            return;
        }

        if (teamIds.length === 1) {
            const { data } = await refetch({ teamId: Number(teamIds[0]), teamTwoId: undefined, finished: true });
            setSelectedTeamGamesData(data.games);
            setConfrontationResult('');
        }

        if (teamIds.length === 2) {
            const { data } = await refetch({
                teamId: Number(teamIds[0]),
                teamTwoId: Number(teamIds[1]),
                finished: true
            });

            const selectedTeamOne = teamStatsData!.teamStats!.find(item => item.id === Number(teamIds[0]));
            const selectedTeamTwo = teamStatsData!.teamStats!.find(item => item.id === Number(teamIds[1]));

            const aggrData = data.games.reduce((acc, game) => {
                if (game.winner!.name === acc.teamOne.name) {
                    acc.teamOne.wins++;
                } else {
                    acc.teamTwo.wins++;
                }
                return acc;
            }, {
                teamOne: { name: selectedTeamOne!.name, wins: 0 },
                teamTwo: { name: selectedTeamTwo!.name, wins: 0 }
            });

            setConfrontationResult(
                `"${aggrData.teamOne.name}" wins in direct confrontations with "${aggrData.teamTwo.name}":  ${aggrData.teamOne.wins} - ${aggrData.teamTwo.wins}`
            );

            setSelectedTeamGamesData(data.games);
        }
    };

    return (
        <div className="py-4 text-xl">
            <Table
                aria-label="Teams statistics dashboard"
                removeWrapper
                classNames={{
                    td: ['text-xl', 'first:hidden'],
                    th: ['text-xl', 'first:hidden'],
                }}
                className='mb-4'
                selectionMode="multiple"
                selectedKeys={selectedTeams}
                onSelectionChange={handleTeamSelection}
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows} emptyContent={'No rows to display.'}>
                    {(row) => (
                        <TableRow key={row.id}>
                            {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {selectedTeamGamesData ? (
                <>
                    {confrontationResult ? (
                        <p>{confrontationResult}</p>
                    ) : (null)
                    }
                    <GamesList data={selectedTeamGamesData} />
                </>
            ) : null}

        </div >
    );
}
