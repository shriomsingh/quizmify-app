"use client"
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react'
import D3WordCloud from 'react-d3-cloud';
interface Props {
    formattedTopic: {text: string, value: number}[];
}


const fontSizeMapper = (word: {value: number}) => {
    return Math.log2(word.value)*5 + 16;
}


const CustomWordCloud: React.FC<Props> = ({formattedTopic}) => {
    const theme = useTheme();
    const router = useRouter();
    return (
        <>
            <D3WordCloud
                height={550}
                data={formattedTopic}
                font="Open Sans"
                fontWeight="bold"
                fontSize={fontSizeMapper}
                rotate={0}
                padding={10}
                fill = {theme.theme =='dark' ? 'white' : "black"}
                onWordClick={(e, d) => {
                    router.push("/quiz?topic=" + d.text);
                }}
            />
        </>
    )
}

export default CustomWordCloud
