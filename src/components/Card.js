import { useState, useContext } from 'react';
import { AccessContext } from './AccessProvider';
import './Card.css'


function Card({name, id}) {
    const [hidden, setHidden] = useState(true);

    const { updateDatabaseID } = useContext(AccessContext)

    const style1 = {
        border: "solid 1px #F6BF33",
        backgroundColor: "#191919"
    }
    
    const style2 = {
        border: "solid 1px #F6BF33",
        backgroundColor: "#F6BF33"
    }

    function clickHandler(e) {
        e.preventDefault();
        updateDatabaseID(e.target.value)
        console.log(e.target.value)
    }

    return (
        <button className="card" 
        onMouseEnter={() => setHidden(false)}
        onMouseLeave={() => setHidden(true)}
        onClick={clickHandler}
        style={hidden ? style1 : style2}
        value={id}
        >
            <p>{name}</p>
        </button>
    )
}

export default Card