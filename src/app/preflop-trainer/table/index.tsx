'use client'

import './styles.css'
import classnames from 'classnames'

export type TableProps = {
  heroCards: string,
  villanCards: string[],
  openVillanCards: boolean,
  result: string
}

const seatClassnames = classnames([
  'seat'
])

export default function Table(props: TableProps) {
  return (
    <div className="container">
      <div className="resultMessage">{props.result}</div>
      <div className="table"></div>
      <div>
        {displayOpenedCards(props.heroCards, true)}
        {props.villanCards.map((villanCards) => {
          return villanCards && props.openVillanCards ? displayOpenedCards(villanCards) : displayVillanCards()
        })}
      </div>
    </div>
  )
}

function displayVillanCards(): JSX.Element {
  return (
    <div className={`${seatClassnames}`}>
      <img className="holeCards" src="/cards/card_back.png" alt="villan hole cards" />
      <img className="holeCards" src="/cards/card_back.png" alt="villan hole cards" />
    </div>
  )
}

function displayOpenedCards(cards: string, isHero: boolean | undefined = false): JSX.Element {
  const cardList = [
    cards.substring(0, 2),
    cards.substring(2, 4)
  ]

  return (
    <div className={`${isHero ? 'hero' : ''} ${seatClassnames}`}>
      {cardList.map((card, index) => {
        return isHero ? <img className={`card${index}`} src={`/cards/${card}.png`} key={card} alt={card} />
          : <img className="holeCards" src={`/cards/${card}.png`} key={card} alt={card} />
      })}
    </div>
  )
}