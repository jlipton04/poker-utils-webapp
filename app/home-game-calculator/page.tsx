'use client'
import { getMinTransfers } from '@/lib/decentrailizedBanker'
import PlayerRow, { PlayerRowData } from './PlayerRow'
import { Dispatch, SetStateAction, useState } from "react"
import TransactionsModal, { TransactionData } from './TransactionsModal'

export default function HomeGameCalculator() {
    const [players, setPlayers] = useState([{}, {}] as PlayerRowData[])
    const [showTransactions, setShowTransactions] = useState(false)
    const [transactions, setTransactions] = useState([] as TransactionData[])

    return (<div className="container-fluid">
        {showTransactions && <TransactionsModal {...{
            transactions,
            onClose: () => setShowTransactions(false)
        }} />}
        <a
            role='button'
            href=''
            onClick={e => {
                e.preventDefault()
                setPlayers([...players, {} as PlayerRowData])
            }}
        >Add Player</a>
        <a
            role='button'
            href=''
            onClick={e => {
                e.preventDefault()
                calculateTransactions(players, setShowTransactions, setTransactions)
            }}
        >Calculate Transactions</a>
        {players.map((playerRowData, index) => (<PlayerRow
            key={index}
            {...playerRowData}
            {...{
                onRemove() {
                    setPlayers(players.filter((_, filterInd) => index !== filterInd))
                },
                handleInputChange(field, value, type) {
                    const parsedValue = type === 'number' ? Number(value) : value

                    setPlayers((oldPlayers) => {
                        return oldPlayers.map(((playerRowData, ind) => {
                            if (ind !== index) {
                                return playerRowData
                            }

                            (playerRowData as any)[field] = parsedValue

                            return playerRowData
                        }))
                    })
                },
            }}
        />))}
    </div>)
}

function calculateTransactions(
    players: PlayerRowData[],
    setShowTransactions: (value: SetStateAction<boolean>) => void,
    setTransactions: (Dispatch<SetStateAction<TransactionData[]>>)
) {
    const balances = players.map((playerRowData => playerRowData.cashOut - playerRowData.buyIn))
    const calculatedTransactions = getMinTransfers(balances)

    if (calculatedTransactions === null) {
        return
    }

    setShowTransactions(true)

    setTransactions(calculatedTransactions.map(({ to, from, amount }) => ({
        toName: players[to].playerName,
        toVenmo: players[to].venmo,
        fromName: players[from].playerName,
        fromVenmo: players[from].venmo,
        amount
    } as TransactionData)))
}