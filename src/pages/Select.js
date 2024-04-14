import { useContext, useEffect, useState } from "react";
import '../App.css'
import { AccessContext } from "../components/AccessProvider";
import Card from "../components/Card";
// import { Client } from '@notionhq/client'

function Select() {
    const { databaseID, providerToken } = useContext(AccessContext)
    const rootURL = 'http://ec2-3-149-239-235.us-east-2.compute.amazonaws.com'
    const [databases, setDatabases] = useState([])

    useEffect(() => {
        fetch(`${rootURL}/api/v1/search?provider_token=${providerToken}`, {method: "POST"})
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            console.log(data)
            setDatabases(data)
        })
        .catch((error) => console.log(error));
    })


    return (
        <div className="App">
            <div className="header-select">
                <h3 style={{textAlign: "left", width: "460px"}}>Choose database.</h3>
                <button 
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
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
        
    )
}

export default Select;