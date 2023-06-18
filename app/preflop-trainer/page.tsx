'use client'

import React, {useState} from 'react'
import Table, { TableProps } from '../components/table'
import ActionBar, { ActionBarProps } from '../components/actionBar'
import OptionsBar from '../components/optionsBar'
import { getHoleCards } from '../controller/preflopTableController'


export default function PreflopTrainer() {
    const [currHoleCards, currQuality] = getHoleCards()

    const [holeCards, setHoleCards] = useState(currHoleCards)
    const [quality, setQuality] = useState(currQuality)

    const tableProps: TableProps = {
        heroCards: holeCards,
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

    function onAction() {
        const [newHoleCards, newQuality] = getHoleCards()

        setHoleCards(newHoleCards)
        setQuality(newQuality)
    }

    return (
        <div>
            <OptionsBar />
            <Table {...tableProps}/>
            <ActionBar {...actionBarProps} />
        </div>
    )
}