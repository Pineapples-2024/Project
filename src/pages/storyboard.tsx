import { useState } from "react";

function Storyboard() {
  const [ state, setState  ] = useState(0);

  return <>
    Better better better better storyboard!

    <p>{state}</p>

    <button onClick={() => setState(1)}>hi</button>
  </>
}

export default Storyboard;