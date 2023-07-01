'use client'

import './styles.css'
import classnames from 'classnames'

export type TableProps = {
  heroCards: string,
  villanCards: boolean[],
  result: string
}

const seatClassnames = classnames([
  'seat'
])

export default function Table(props: TableProps) {
  const heroCards = [
    props.heroCards.substring(0,2),
    props.heroCards.substring(2,4)
  ]

  return (
    <div className="container">
      <div className="resultMessage">{props.result}</div>
      <div className="table"></div>
      <div>
        <div className={`hero ${seatClassnames}`}>
          {heroCards.map((card, index) => {
            return <img className={`card${index}`} src={`/cards/${card}.png`} key={card} alt={card} />
          })}
        </div>
        {props.villanCards.map((isInHand) => {
          return isInHand && <div className={`${seatClassnames}`}>
            <img className="holeCards" src="/cards/card_back.png" alt="villan hole cards" />
            <img className="holeCards" src="/cards/card_back.png" alt="villan hole cards" />
          </div>
        })}
      </div>
    </div>
  )
}