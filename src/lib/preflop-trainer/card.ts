export const SUITS = ['C', 'D', 'H', 'S']
export const PIPS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

export type Card = {
    suit: typeof SUITS[number],
    pip: typeof PIPS[number]
}

export function getCardString({
    suit,
    pip
}: Card) {
    return pip+suit;
}