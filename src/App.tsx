import Display from "./components/display/display.tsx";
import header from "./assets/desktop_header.png";
import StarsBackground from "./components/ui/extra.tsx";
import { H1 } from "./components/ui/extra.tsx";
import { Separator } from "../src/components/ui/separator.tsx";
import Footer from "./components/display/footer.tsx";
import GameOverDialog from "./components/display/gameoverdialog.tsx";

function App() {
  return (
    <>
      <header className="w-full overflow-hidden">
        <div
          className="relative bg-black flex items-center justify-between select-none h-30"
          style={{
            backgroundImage: `url(${header})`,
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <H1 className="absolute whitespace-nowrap left-1/2 -translate-x-1/2 [text-shadow:0_0_6px_rgba(59,130,246,0.8),0_0_16px_rgba(59,130,246,0.6),0_0_30px_rgba(59,130,246,0.35)]">
            Centurion
          </H1>
        </div>
      </header>
      <Separator />

      <main className="relative min-h-screen overflow-hidden bg-black select-none p-2">
        <StarsBackground />
        <div className="relative z-10 w-full mx-auto">
          <Display />
          <GameOverDialog />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
