'use client'

import './styles.css'
import classnames from 'classnames'

export type TableProps = {
  heroCards: string,
  villanCards: boolean[]
}

const seatClassnames = classnames([
  'seat'
])

export default function Table(tableProps: TableProps) {
  const heroCards = [
    tableProps.heroCards.substring(0,2),
    tableProps.heroCards.substring(2,4)
  ]

  return (
    <div className="container">
      <div className="table"></div>
      <div>
        <div className={`hero ${seatClassnames}`}>
          {heroCards.map((card) => {
            return <img src={`/cards/${card}.png`} key={card} alt={card} />
          })}
        </div>
        {tableProps.villanCards.map((isInHand) => {
          return isInHand && <div className={`${seatClassnames}`}>
            <img className="holeCards" src="/cards/card_back.png" alt="villan hole cards" />
            <img className="holeCards" src="/cards/card_back.png" alt="villan hole cards" />
          </div>
        })}
      </div>
    </div>
  )
}