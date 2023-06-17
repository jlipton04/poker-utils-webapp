'use client'

import './styles.css'

export default function ActionBar(props: ActionBarProps) {
    return (
        <div className="actionBar">
            { props.call && <button className="call">Call</button> }
            { props.raise && <button className="raise">Raise</button> }
            { props.fold && <button className="fold">Fold</button> }
        </div>
    )
}

export type ActionBarProps = {
    call: boolean,
    raise: boolean,
    fold: boolean
}