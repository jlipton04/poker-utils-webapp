'use client'

import { Card, getCardString } from '@lib/types/card'
import './styles.scss'
import classnames from 'classnames'
import { Player } from '@lib/types/player'
import Image from 'next/image'

export type TableProps = {
  holeCards: Player[],
  openVillanCards: boolean,
  result: string
}

const seatClassnames = classnames([
  'seat'
])

export default function Table({
  holeCards,
  openVillanCards,
  result
}: TableProps) {
  return (
    <div className="container-fluid">
      <div className='resultMessage'>{result}</div>
      <div className='table'></div>
      <div className={`handed-${holeCards.length}`}>
        {displayOpenedCards(holeCards[0].holeCards, holeCards[0].position, true)}
        {holeCards.filter((_, index) => index !== 0).map(({ holeCards, inHand, position }) => {
          if (!inHand) {
            return
          }

          return openVillanCards ? displayOpenedCards(holeCards, position) : displayVillanCards(position)
        })}
      </div>
    </div>
  )
}

function displayVillanCards(position: string): JSX.Element {
  const isButton = position === 'BTN'

  return (
    <div className={`${seatClassnames}`}>
      <img className='holeCards' src="/cards/card_back.png" alt="villan hole cards" />
      <img className='holeCards' src="/cards/card_back.png" alt="villan hole cards" />
      {isButton && getDealerButton()}
    </div>
  )
}

function displayOpenedCards(
  cards: Card[],
  position: string,
  isHero: boolean = false,
) {
  const isButton = position === 'BTN'

  return (
    <div className={`${isHero ? 'hero' : ''} ${seatClassnames}`}>
      {cards.map((card, index) => {
        const cardName = getCardString(card)

        return isHero ? <img className={`card${index}`} src={`/cards/${cardName}.png`} key={cardName} alt={cardName} />
          : <img className='holeCards' src={`/cards/${cardName}.png`} key={cardName} alt={cardName} />
      })}
      {isButton && getDealerButton()}
    </div>
  )
}

function getDealerButton() {
  return <Image
    className='bettingLine'
    src='/dealerButton.png'
    alt='Dealer Button'
    width={50}
    height={50}
  />
}