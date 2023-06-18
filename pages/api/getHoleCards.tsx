import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

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

const RANGE_PATH = './ranges/'

const loadedRanges: Map<string, Map<string, Map<string, string[]>>> = new Map<string, Map<string, Map<string, string[]>>>()

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

export function isCorrect(mode: string, position: string, cardQuality: string, action: string, callback: (n: boolean) => any) {
    if (!loadedRanges.get(mode)?.get(position)?.get(action)) {
        loadRange(mode, position, action)
    }

    const currentRange = loadedRanges.get(mode)!!.get(position)!!.get(action)!!

    callback(currentRange.includes(cardQuality))
}

function loadRange(mode: string, position: string, action: string) {
    const fileContent = fs.readFileSync(`${RANGE_PATH}${mode}_${position}_${action}.txt`, 'utf-8')
    const parsedWithPercentages = fileContent.split(',')

    if (mode == 'RFI') {
        parsedWithPercentages.forEach((card, index) => {
            parsedWithPercentages[index] = card.substring(0, 3)
        })
    }

    if (!loadedRanges.has(mode)) {
        loadedRanges.set(mode, new Map<string, Map<string, string[]>>())
    }

    if (!loadedRanges.get(mode)!!.has(position)) {
        loadedRanges.get(mode)!!.set(position, new Map<string, string[]>())
    }

    loadedRanges.get(mode)!!.get(position)!!.set(action, parsedWithPercentages)
}