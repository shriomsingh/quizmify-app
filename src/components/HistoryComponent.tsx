import { prisma } from '@/lib/db'
import { ClockIcon, CopyCheck, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {
    limit: number,
    userId: string,
}

const HistoryComponent: React.FC<Props> = async ({limit, userId}) => {
    const games = await prisma.game.findMany({
        where: {
            userId
        },
        take: limit,
        orderBy: {
            timeStarted: 'desc'
        }
    })
    return (
        <div className='space-y-8 '>
            {
                games.map((game) => {
                    return (
                        <div className="flex items-center justify-between" key={game.id}>
                            <div className="flex items-center">
                                {game.gameType === 'topic_based' ? (<CopyCheck className='mr-3'/>) : (<LinkIcon className='mr-3'/>)}
                                <div className='ml-4 space-y-1'>
                                    <Link href={`/statistics/${game.id}`} className="text-base font-medium leading-none underline">{game.topic}</Link>
                                    <p className='flex items-center px-2 py-1 text-sm text-white rounded-lg w-fit bg-slate-800'>
                                        <ClockIcon className='w-4 h-4 mr-1'/>
                                        {new Date(game.timeEnded ?? 0).toLocaleDateString()}
                                    </p>
                                    <p className='text-sm text-muted-foreground'>{game.gameType === 'topic_based' ? "Topic Based" : "Link Based"}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default HistoryComponent
