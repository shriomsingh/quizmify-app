import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import CustomWordCloud from '../CustomWordCloud'
import { prisma } from '@/lib/db';

interface Props {
    
}

const HotTopicsCard: React.FC<Props> = async () => {
    const topics = await prisma.topic_count.findMany({});
    const formattedTopics = topics.map(topic =>{
        return (
            {text: topic.topic,
            value: topic.count,}
        )
    })
    return (
        <Card className='col-span-4'>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
                <CardDescription>
                    Click on a topic to start a quiz on it!
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <CustomWordCloud formattedTopic={formattedTopics}/>
            </CardContent>
        </Card>
    )
}

export default HotTopicsCard
