'use client'

import React, { useEffect, useState } from 'react'
import Table, { TableProps } from '../components/table'
import ActionBar, { ActionBarProps } from '../components/actionBar'
import OptionsBar from '../components/optionsBar'
import { GetHoleCardsData } from '../../pages/api/getHoleCards'
import { IsCorrectActionResponse, IsCorrectActionRequest } from '@/pages/api/isCorrectAction'


export default function PreflopTrainer() {
    const [currentHoleCards, setCurrentHoleCards] = useState('')
    const [currentQuality, setCurrentQuality] = useState('')
    const [currentPosition, setCurrentPosition] = useState('')

    useEffect(() => {
        getHoleCards().then((data: GetHoleCardsData) => {
            const { holeCards, cardQuality, position } = data

            setCurrentHoleCards(holeCards)
            setCurrentQuality(cardQuality)
            setCurrentPosition(position)
        })
    }, [])

    const tableProps: TableProps = {
        heroCards: currentHoleCards,
        villanCards: [
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ]
    }

    const actionBarProps: ActionBarProps = {
        call: false,
        raise: true,
        fold: true,
        onAction
    }

    async function onAction() {
        // console.log(isCorrect('RFI', 'UTG', currentQuality, 'RAISE', (correct: boolean) => {
        //     console.log(correct)
        // }))

        isCorrectAction(
            'RAISE',
            currentQuality,
            'UTG' || currentPosition,
            'RFI'
        ).then((data: IsCorrectActionResponse) => {
            console.log(data.correct)
        })

        // Reset for next hand
        const { holeCards, cardQuality, position } = await getHoleCards()

        setCurrentHoleCards(holeCards)
        setCurrentQuality(cardQuality)
        setCurrentPosition(position)
    }

    return (
        <div>
            <OptionsBar />
            <Table {...tableProps} />
            <ActionBar {...actionBarProps} />
        </div>
    )
}

async function isCorrectAction(
    action: string,
    cardQuality: string,
    position: string,
    mode: string
): Promise<IsCorrectActionResponse> {
    return (await fetch('/api/isCorrectAction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action,
            cardQuality,
            position,
            mode
        } as IsCorrectActionRequest)
    })).json()
}

async function getHoleCards(): Promise<GetHoleCardsData> {
    return (await fetch('/api/getHoleCards')).json()
}