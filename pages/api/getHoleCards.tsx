import type { NextApiRequest, NextApiResponse } from 'next'

const PIPS = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'J',
    'Q',
    'K',
    'A'
]

const SUITS = [
    'C',
    'D',
    'H',
    'S'
]

export const POSITIONS = [
    'UTG',
    'UTG+1',
    'LJ',
    'HJ',
    'CO',
    'BTN',
    'SB',
    'BB'
]

const SUITED = 's'

const OFFSUIT = 'o'

export type GetHoleCardsData = {
    holeCards: string,
    cardQuality: string,
    position: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetHoleCardsData>
) {
    const cardOne = PIPS[Math.floor(Math.random() * PIPS.length)] + SUITS[Math.floor(Math.random() * SUITS.length)]
    let cardTwo = cardOne

    while (cardOne === cardTwo) {
        cardTwo = PIPS[Math.floor(Math.random() * PIPS.length)] + SUITS[Math.floor(Math.random() * SUITS.length)]
    }

    const pips = [cardOne.charAt(0), cardTwo.charAt(0)].sort((one, two) => PIPS.indexOf(one) > PIPS.indexOf(two) ? -1 : 1).join("");

    let quality = OFFSUIT
    if (cardOne.charAt(1) === cardTwo.charAt(1)) {
        quality = SUITED
    }

    res.status(200).json({
        holeCards: cardOne + cardTwo,
        cardQuality: pips + quality,
        position: POSITIONS[Math.floor(Math.random() * POSITIONS.length)]
    })
        
}