import { useContext, useEffect, useState } from "react";
import '../App.css'
import { AccessContext } from "../components/AccessProvider";
import Card from "../components/Card";
// import { Client } from '@notionhq/client'

function Select() {
    const { providerToken } = useContext(AccessContext)
    const rootURL = 'http://ec2-3-149-239-235.us-east-2.compute.amazonaws.com'

    useEffect(() => {
        fetch(`${rootURL}/api/v1/search?provider_token=${providerToken}`, {method: "POST"})
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => console.log(error));
    })


    return (
        <div className="App">
            <div className="select-scroll">
                <Card />
                <Card />
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
        
    )
}

export default Select;