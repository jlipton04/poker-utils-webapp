'use client'

import './styles.css'
import classnames from 'classnames'

const seatClassnames = [
  'seat'
]

export default function Table() {
  return (
    <div className="container">
      <div className="table"></div>
      <div>
        <div className={`hero ${seatClassnames}`}>
          Hero
        </div>
        <div className={`${seatClassnames}`}>

        </div>
        <div className={`${seatClassnames}`}>

        </div>
        <div className={`${seatClassnames}`}>

        </div>
        <div className={`${seatClassnames}`}>

        </div>
        <div className={`${seatClassnames}`}>

        </div>
        <div className={`${seatClassnames}`}>

        </div>
        <div className={`${seatClassnames}`}>

        </div>
      </div>
    </div>
  )
}