import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../components/view/wrapper/Wrapper'
import { toggle } from '../../reducer/nav_side/Reducer'
import { RootState } from '../../reducer/RootReducer'

function ToggleContainer() {
    const toggleSelect = useSelector((state: RootState) => state.ToggleReducer)
    const dispatch = useDispatch();

    const onToggle = () => {
        dispatch(toggle());
    };

    return (
      <div></div>
    )
}

export default ToggleContainer