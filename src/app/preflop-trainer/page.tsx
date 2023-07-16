'use client'

import { useState } from 'react'
import Table, { TableProps } from '@/app/preflop-trainer/table'
import ActionBar, { ActionBarProps } from '@/app/preflop-trainer/actionBar'
import OptionsBar, { OptionsBarProps } from '@/app/preflop-trainer/optionsBar'
import { IsCorrectActionResponse, IsCorrectActionRequest } from '@pages/api/isCorrectAction'
import { getPlayers, executeTurn } from '@lib/preflop-trainer/controller'

const PLAYER_COUNT = 9

export default function PreflopTrainer() {
    const [players, setPlayers] = useState(getPlayers(PLAYER_COUNT))
    const [currentResult, setCurrentResult] = useState('')
    const [turn, setTurn] = useState(0)

    const updatedPlayers = executeTurn(turn, players)
    const hero = players[0]

    const optionsBarProps: OptionsBarProps = {
        position: hero.position,
        mode: 'RFI'
    }

    const tableProps: TableProps = {
        holeCards: updatedPlayers,
        result: currentResult,
        openVillanCards: true
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
            setPlayers(getPlayers(PLAYER_COUNT))
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