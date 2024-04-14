import './Card.css'

function Card({name, id}) {


    return (
        <div className="card">
            <p>{name}</p>
            <p className='db_id' hidden>{id}</p>
        </div>
    )
}

export default Card