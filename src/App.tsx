//import { useState } from "react";

import GameControl from "./components/gamecontrol.tsx";
import Display from "./components/display.tsx";
import "./App.css";

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
        </div>
      </section>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Kijelző</h2>
          <Display />
        </div>
      </section>

      <section id="spacer">
        <div>
          <GameControl />
        </div>
      </section>
    </>
  );
}

export default App;
