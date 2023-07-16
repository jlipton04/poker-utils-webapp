'use client'

import { useEffect, useState } from 'react'
import Table, { TableProps } from '@/app/preflop-trainer/table'
import ActionBar, { ActionBarProps } from '@/app/preflop-trainer/actionBar'
import OptionsBar, { OptionsBarProps } from '@/app/preflop-trainer/optionsBar'
import { IsCorrectActionResponse, IsCorrectActionRequest } from '@pages/api/isCorrectAction'
import { getPlayers } from '@lib/preflop-trainer/controller'

const PLAYER_COUNT = 9

export default function PreflopTrainer() {
    const [holeCards, setHoleCards] = useState(getPlayers(PLAYER_COUNT))
    const [hero, setHero] = useState(holeCards[0])
    const [currentResult, setCurrentResult] = useState('')

    useEffect(() => {
        setHero(holeCards[0])
    }, [holeCards])

    const optionsBarProps: OptionsBarProps = {
        position: holeCards[0].position,
        mode: 'RFI'
    }

    const tableProps: TableProps = {
        holeCards: getPlayers(PLAYER_COUNT),
        result: currentResult,
        openVillanCards: false
    }

    const actionBarProps: ActionBarProps = {
        call: hero.position === 'SB',
        raise: true,
        fold: true,
        onAction
    }

    async function onAction(action: string) {
        isCorrectAction(
            action,
            hero.quality,
            hero.position,
            'RFI'
        ).then((data: IsCorrectActionResponse) => {
            setCurrentResult(data.correct ? 'Correct!' : 'Wrong')
            setHoleCards(getPlayers(PLAYER_COUNT))
        })
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