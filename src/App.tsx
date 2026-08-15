import Display from "./components/display/display.tsx";
import header from "./assets/desktop_header.png";
import StarsBackground from "./components/ui/extra.tsx";
import Calendar from "./components/display/calendar.tsx";
import { H1 } from "./components/ui/extra.tsx";

function App() {
  return (
    <>
      <section id="header">
        <div
          className="relative bg-black flex items-center justify-between select-none"
          style={{
            backgroundImage: `url(${header})`,
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <div className="ml-2 pt-2">
            <Calendar />
          </div>
          <H1 className=" absolute left-1/2 -translate-x-1/2 [text-shadow:0_0_6px_rgba(59,130,246,0.8),0_0_16px_rgba(59,130,246,0.6),0_0_30px_rgba(59,130,246,0.35)]">
            Centurion
          </H1>
        </div>
      </section>

      <main className="relative min-h-screen overflow-hidden bg-black select-none">
        <StarsBackground />
        <div className="relative z-10">
          <Display />
        </div>
      </main>
    </>
  );
}

export default App;
