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

    const [selectedTeamGamesData, setSelectedTeamGamesData] = useState<Game[]>();

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

        if (!teamIds.length) return setSelectedTeamGamesData(undefined);

        const { data } = await refetch({ teamId: Number(teamIds[0]), finished: true });
        setSelectedTeamGamesData(data.games);
    };

    return (
        <div className="py-4 text-xl">
            <Table
                removeWrapper
                classNames={{ td: ['text-xl'], th: ['text-xl'] }}
                selectionMode="single"
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
                <GamesList data={selectedTeamGamesData} />
            ) : null}

        </div>
    );
}
