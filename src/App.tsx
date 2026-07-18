//import { useState } from "react";

import Display from "./components/display.tsx";
import header from "./assets/header_centurion.png";

function App() {
  return (
    <>
      <section id="center">
        <div>
          <img
            src={header}
            className="w-full h-48 object-contain"
            alt="Centurion Header"
          />
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
