import React from 'react'

export default function Confirmation(props) {
    console.log("props", props.message[0].message)
    return (
        <div>
        <span>{props.message[0].message}</span>
        </div>
    )
}
