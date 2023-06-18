'use client'

import './styles.css'

export default function ActionBar(
    props: ActionBarProps
) {
    return (
        <div className="actionBar">
            {props.call && <button className="call" onClick={() => props.onAction()}>Call</button>}
            {props.raise && <button className="raise" onClick={() => props.onAction()}>Raise</button>}
            {props.fold && <button className="fold" onClick={() => props.onAction()}>Fold</button>}
        </div>
    )
}

export type ActionBarProps = {
    call: boolean,
    raise: boolean,
    fold: boolean,
    onAction: Function
}