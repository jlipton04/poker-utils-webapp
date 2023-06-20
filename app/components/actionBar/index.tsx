'use client'

import './styles.css'

export default function ActionBar(
    props: ActionBarProps
) {
    return (
        <div className="actionBar">
            {props.call && <button className="call" onClick={() => props.onAction('CALL')}>Call</button>}
            {props.raise && <button className="raise" onClick={() => props.onAction('RAISE')}>Raise</button>}
            {props.fold && <button className="fold" onClick={() => props.onAction('FOLD')}>Fold</button>}
        </div>
    )
}

export type ActionBarProps = {
    call: boolean,
    raise: boolean,
    fold: boolean,
    onAction: (action: string) => void
}