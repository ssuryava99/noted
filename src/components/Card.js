import { useState, useContext } from 'react';
import { AccessContext } from './AccessProvider';
import './Card.css'


function Card({name, id}) {
    const [hidden, setHidden] = useState(true);

    const { databaseID, updateDatabaseID } = useContext(AccessContext)

    const style1 = {
        border: "solid 1px #F6BF33",
        backgroundColor: "#191919"
    }
    
    const style2 = {
        border: "solid 1px #F6BF33",
        backgroundColor: "#F6BF33",
        color: "black"
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
        style={(!hidden || databaseID === id) ? style2 : style1}
        value={id}
        >
            <p>{name}</p>
        </button>
    )
}

export default Card