//import { useState } from "react";

import Display from "./components/display/display.tsx";
import header from "./assets/desktop_header.png";

function App() {
  return (
    <>
      <section id="header">
        <div className=" bg-black flex items-center justify-center">
          <img
            src={header}
            className="max-w-full max-h-30 object-contain"
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
