import TopicBased from '@/components/TopicBased';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
    params: {
        gameId: string;
    }
}

const TopicBasedPage: React.FC<Props> = async ({params: {gameId}}) => {
    
    try{
        const session = await getAuthSession();
        if(!session?.user){
            return redirect('/');
        }
        const game = await prisma.game.findUnique({
            where:{
                id: gameId,
            },
            include: {
                questions: {
                    select :{
                        id: true,
                        question: true,
                        options: true,
                    },
                }
            } 
        })
        if(!game){
            return redirect("/quiz");
        }
        return (
            <TopicBased game={game} />
        );
    } catch(error) {
        console.log("Error in /topic-based/:id", error);
        return <div>Error fetching Data</div>;
    }
}

export default TopicBasedPage
