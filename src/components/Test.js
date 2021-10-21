import { useState } from "react";
import Child from "./Child";

const Test = () => {
    //const { lists, setLists, render } = Child("testt");
    const [state, setState] = useState();

    return (
        <div>
            Parent
            <Child state={state} setState={setState} />
            <button onClick={() => setState('TEESSTT')}>Change</button>
        </div>
    )
}
export default Test;