import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Target } from 'lucide-react'

interface Props {
    accuracy: number,
}

const AccuracyCard: React.FC<Props> = ({accuracy}) => {
    return (
        <Card className="md:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold ">Your Accuracy</CardTitle>
                <Target />
            </CardHeader>
            <CardContent>
                <div className="text-xl text-black dark:text-white opacity-90">{accuracy.toString()}%</div>
            </CardContent>
        </Card>
    )
}

export default AccuracyCard
