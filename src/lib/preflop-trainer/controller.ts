import { Card, PIPS, SUITS, getHoldemCardQuality } from "@lib/types/card"
import { Player } from "@lib/types/player"

const NUMBER_OF_HOLE_CARDS = 2

export const POSITIONS_9 = [
    'UTG',
    'UTG+1',
    'UTG+2',
    'LJ',
    'HJ',
    'CO',
    'BTN',
    'SB',
    'BB'
]

/**
 * This function returns a list of players, poulated with their hole cards, card qualities
 * and positions in order. All of these values will be random, except for the positions,
 * which will be randomly offset but in order.
 * 
 * @param numberOfHands number of players to generate
 * @param trainingMode training mode, if RFI hero will never be BB
 * @returns a list of players, with hero at index 0
 */
export function getPlayers(
    numberOfPlayers: number,
    trainingMode: string = 'RFI'
): Player[] {
    const players: Player[] = []

    const positionOffset = Math.floor(
        Math.random() * (trainingMode === 'RFI'
            ? POSITIONS_9.length - 1
            : POSITIONS_9.length)
    )

    let deck = SUITS.flatMap(suit =>
        PIPS.map(pip => ({
            suit,
            pip
        } as Card))
    )

    for (let i = 0; i < numberOfPlayers; i++) {
        const holeCards: Card[] = []

        for (let j = 0; j < NUMBER_OF_HOLE_CARDS; j++) {
            const cardIndex = Math.floor(Math.random() * deck.length)

            holeCards.push(deck[cardIndex])

            deck.splice(cardIndex, 1)
        }

        players.push({
            holeCards,
            position: POSITIONS_9[(i + positionOffset) % POSITIONS_9.length],
            quality: getHoldemCardQuality(holeCards),
            inHand: true
        })
    }

    return players
}

export function executeTurn(turn: number, players: Player[]): Player[] {
    if (turn === 0) {
        for (let i = players.length-1; i >= 1; i--) {
            if (players[i].position === 'BB') {
                break
            }

            players[i].inHand = false
        }
    }

    return players
} 