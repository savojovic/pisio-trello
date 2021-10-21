import { useState } from "react";

const Child = (props) => {
    const [lists, setLists] = useState("lists");
    const { state, setState } = props;
    return (
        <div style={{ border: '2px solid black' }}>

            Child
            <br></br>
            {state}
        </div>
    )

}
export default Child;