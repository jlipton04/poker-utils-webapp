'use client'
import { getMinTransfers } from '@lib/decentrailizedBanker'
import PlayerRow, { PlayerRowData } from './PlayerRow'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import TransactionsModal, { TransactionData } from './TransactionsModal'

export default function HomeGameCalculator() {
    const [players, setPlayers] = useState([{}, {}] as PlayerRowData[])
    const [showTransactions, setShowTransactions] = useState(false)
    const [transactions, setTransactions] = useState([] as TransactionData[])
    const [balanceSum, setBalanceSum] = useState(0)

    useEffect(() => {
        setBalanceSum(
            players
                .map(({ cashOut, buyIn }) => cashOut - buyIn)
                .reduce((acc, balance) => acc + balance, 0)
        )
    }, [players])

    return (<div className="container-fluid">
        {showTransactions && <TransactionsModal {...{
            transactions,
            onClose: () => setShowTransactions(false)
        }} />}
        <b>{balanceInformation(balanceSum)}</b>
        <article>
            <header>
                <button
                    role='button'
                    onClick={_ =>
                        calculateTransactions(players, setShowTransactions, setTransactions)
                    }
                    disabled={!isBalanceSumValid(balanceSum)}
                >Calculate Transactions</button>
                <button
                    role='button'
                    className='contrast'
                    onClick={_ => setPlayers((oldPlayers) => fixBalances(oldPlayers, balanceSum))}
                    disabled={isBalanceSumValid(balanceSum) || isNaN(balanceSum)}
                >Fix Balances</button>
            </header>
            {players.map((playerRowData, index) => (<PlayerRow
                key={index}
                {...playerRowData}
                {...{
                    onRemove() {
                        setPlayers((oldPlayers) => [
                            ...oldPlayers.slice(0, index),
                            ...oldPlayers.slice(index + 1)
                        ])
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
            <footer>
                <a
                    role='button'
                    href=''
                    onClick={e => {
                        e.preventDefault()
                        setPlayers((oldPlayers) => [...oldPlayers, {} as PlayerRowData])
                    }}
                >Add Player</a>
            </footer>
        </article>
    </div >)
}

function isBalanceSumValid(balanceSum: number): boolean {
    return balanceSum === 0
}

function fixBalances(players: PlayerRowData[], balanceSum: number): PlayerRowData[] {
    const numPlayers = players.length
    const perPerson = balanceSum / numPlayers

    return players.map(((playerRowData, _) => {
        playerRowData.cashOut -= perPerson

        return playerRowData
    }))
}

function balanceInformation(balanceSum: number): string | null {
    if (balanceSum > 0) {
        return `Total is $${balanceSum} over total buyins (example $200 should be in play but $210 are being cashed out)`
    }

    if (balanceSum < 0) {
        return `$${Math.abs(balanceSum)} is missing in chips (example $200 should be in play but only $190 are being cashed out)`
    }

    return 'Cash-out balances look good!'
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