//import { useState } from "react";

import Display from "./components/display.tsx";

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>Centurion</h1>
        </div>
      </section>

      <section id="next-steps">
        <div id="docs">
          <h2>Kijelző</h2>
          <Display />
        </div>
      </section>
    </>
  );
}

export default App;
