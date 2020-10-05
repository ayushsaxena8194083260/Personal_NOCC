import React from 'react'

export const CheckBox = props => {
    return (
    <div>

<input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.plantId} /> {props.plantName}





    </div>
    
    )
}

export default CheckBox