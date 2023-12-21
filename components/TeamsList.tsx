import { Team } from '@/utils/types';

export default function TeamsList({ data }: { data: Team[] }) {
    return (
        <div className='flex flex-col py-4 opacity-80'>
            {data?.length ? data.map((team) => (
                <div key={team.id} className='flex flex-row items-center text-2xl gap-2' >
                    <span className='flex-auto w-24 text-center'>{team.name}</span>
                </div>
            )) : (
                <span className='flex-auto text-3xl text-center w-full my-4'> No teams created yet</span>
            )}
        </div>
    );
}