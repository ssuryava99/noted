import { useContext, useEffect, useState } from "react";
import '../App.css'
import { AccessContext } from "../components/AccessProvider";
import Card from "../components/Card";
import { useNavigate } from 'react-router-dom'
// import { Client } from '@notionhq/client'

function Select() {
    const rootURL = 'http://ec2-18-226-180-32.us-east-2.compute.amazonaws.com'
    const { databaseID, providerToken } = useContext(AccessContext)
    const [databases, setDatabases] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${rootURL}/api/v1/search?provider_token=${providerToken}`, {method: "POST"})
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            console.log(data)
            setDatabases(data.data)
        })
        .catch((error) => console.log(error));
    }, [providerToken])

    function idSet(e) {
        e.preventDefault();
        if (databaseID) {
            navigate('/index')
        }
    }


    return (
        <div className="App">
            <div className="header-select">
                <h3 style={{textAlign: "left", width: "460px"}}>Choose database.</h3>
                <button
                onClick={idSet} 
                disabled={databaseID === null}
                style={{
                    background: "#292929",
                    padding: "0",
                    border: 'none'
                }}>
                <span className="material-symbols-outlined" 
                style={{
                    color: "#F6BF33",
                    scale: "2",
                }}
                >done</span>
                </button>
            </div>
            <div className="select-scroll"
                style={{overflowX: `${databases.length > 4 ? "scroll" : "hidden" }`}}
            >
                <div style={{
                    display: "inherit",
                    flexDirection: "column",
                    gap: "1em",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                    
                    }}>
                    {databases.map((database) => (
                        <Card
                        name={database.name}
                        id={database.id}
                        key={database.id}
                        />
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Select;