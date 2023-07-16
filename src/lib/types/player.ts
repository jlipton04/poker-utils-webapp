import { Card } from "./card"

export type Player = {
    holeCards: Card[],
    position: string,
    quality: string,
    inHand: boolean
}