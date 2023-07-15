'use client'

import React, { useEffect, useState } from 'react'
import Table, { TableProps } from '@/app/preflop-trainer/table'
import ActionBar, { ActionBarProps } from '@/app/preflop-trainer/actionBar'
import OptionsBar, { OptionsBarProps } from '@/app/preflop-trainer/optionsBar'
import { GetHoleCardsData } from '@pages/api/getHoleCards'
import { IsCorrectActionResponse, IsCorrectActionRequest } from '@pages/api/isCorrectAction'
import { getVillanCards } from '@lib/preflop-trainer/controller'
import { Card } from '@lib/preflop-trainer/card'


export default function PreflopTrainer() {
    const [currentHoleCards, setCurrentHoleCards] = useState([] as Card[])
    const [currentQuality, setCurrentQuality] = useState('')
    const [currentPosition, setCurrentPosition] = useState('')
    const [currentResult, setCurrentResult] = useState('')

    useEffect(() => {
        getHoleCards().then((data: GetHoleCardsData) => {
            const { holeCards, cardQuality, position } = data

            // TODO: Once API is deprecated for client-side computation, remove this
            const convertedHoleCards: Card[] = [
                {
                    pip: holeCards.substring(0, 1),
                    suit: holeCards.substring(1, 2)
                },
                {
                    pip: holeCards.substring(2, 3),
                    suit: holeCards.substring(3, 4)
                }
            ]

            setCurrentHoleCards(convertedHoleCards)
            setCurrentQuality(cardQuality)
            setCurrentPosition(position)
        })
    }, [])

    const optionsBarProps: OptionsBarProps = {
        position: currentPosition,
        mode: 'RFI'
    }

    const tableProps: TableProps = {
        heroCards: currentHoleCards,
        villanCards: getVillanCards(8, currentHoleCards),
        result: currentResult,
        openVillanCards: false
    }

    const actionBarProps: ActionBarProps = {
        call: currentPosition === 'SB',
        raise: true,
        fold: true,
        onAction
    }

    async function onAction(action: string) {
        isCorrectAction(
            action,
            currentQuality,
            currentPosition,
            'RFI'
        ).then((data: IsCorrectActionResponse) => {
            setCurrentResult(data.correct ? 'Correct!' : 'Wrong')
        })

        // Reset for next hand
        const { holeCards, cardQuality, position } = await getHoleCards()

        // TODO: Once API is deprecated for client-side computation, remove this
        const convertedHoleCards: Card[] = [
            {
                pip: holeCards.substring(0, 1),
                suit: holeCards.substring(1, 2)
            },
            {
                pip: holeCards.substring(2, 3),
                suit: holeCards.substring(3, 4)
            }
        ]

        setCurrentHoleCards(convertedHoleCards)
        setCurrentQuality(cardQuality)
        setCurrentPosition(position)
    }

    return (
        <article>
            <header><OptionsBar {...optionsBarProps} /></header>
            <Table {...tableProps} />
            <footer><ActionBar {...actionBarProps} /></footer>
        </article>
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