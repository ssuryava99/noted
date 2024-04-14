import { useContext } from "react";
import { AccessContext } from "../components/AccessProvider";

function Select() {
    const { accessToken } = useContext(AccessContext)

    return (
        <>
        Select
        </>
    )
}

export default Select;