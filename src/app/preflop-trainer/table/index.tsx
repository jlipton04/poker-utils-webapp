import { Card, getCardString } from '@lib/types/card'
import './styles.scss'
import classnames from 'classnames'
import { Player } from '@lib/types/player'
import Image from 'next/image'

export enum Deck {
  STANDARD = 'STANDARD',
  FOUR_COLOR = 'FOUR_COLOR'
}

export type TableProps = {
  holeCards: Player[],
  openVillanCards: boolean,
  result: string,
  deck: Deck
}

const seatClassnames = classnames([
  'seat'
])

export default function Table({
  holeCards,
  openVillanCards,
  result,
  deck
}: TableProps) {
  return (
    <div className="container-fluid">
      <div className='resultMessage'>{result}</div>
      <div className='table'></div>
      <div className={`handed-${holeCards.length}`}>
        {displayOpenedCards(holeCards[0].holeCards, holeCards[0].position, deck, true)}
        {holeCards.filter((_, index) => index !== 0).map(({ holeCards, inHand, position }) => {
          if (!inHand) {
            return
          }

          return openVillanCards ? displayOpenedCards(holeCards, position, deck) : displayVillanCards(position)
        })}
      </div>
    </div>
  )
}

function displayVillanCards(position: string): JSX.Element {
  return (
    <div className={`${seatClassnames}`}>
      <img className='holeCards' src="/cards/card_back.png" alt="villan hole cards" />
      <img className='holeCards' src="/cards/card_back.png" alt="villan hole cards" />
      <SeatButton position={position} />
    </div>
  )
}

function displayOpenedCards(
  cards: Card[],
  position: string,
  deck: Deck,
  isHero: boolean = false,
) {
  return (
    <div className={`${isHero ? 'hero' : ''} ${seatClassnames}`}>
      {cards.map((card, index) => {
        const cardName = getCardString(card)

        return isHero ? <img className={`card${index}`} src={getCardSrc(cardName, deck)} key={cardName} alt={cardName} />
          : <img className='holeCards' src={getCardSrc(cardName, deck)} key={cardName} alt={cardName} />
      })}
      <SeatButton position={position} />
    </div>
  )
}

function getCardSrc(cardName: string, deck: Deck) {
  switch (deck) {
    case Deck.STANDARD:
      return `/cards/${cardName}.png`
    case Deck.FOUR_COLOR:
      return `/alt_cards/${cardName}.svg`
    default:
      return undefined
  }
}

function SeatButton({ position }: { position: string }) {
  const buttonSrc = (position => {
    switch (position) {
      case 'BTN': return '/dealerButton.png'
      case 'SB': return '/smallBlindButton.png'
      case 'BB': return '/bigBlindButton.png'
      default: return null
    }
  })(position)

  if (buttonSrc === null) {
    return
  }

  return <Image
    className='bettingLine'
    src={buttonSrc!}
    alt='Dealer Button'
    width={50}
    height={50}
  />
}