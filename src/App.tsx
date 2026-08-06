import Display from "./components/display/display.tsx";
import header from "./assets/desktop_header.png";
import StarsBackground from "./components/ui/extra.tsx";

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

      <main className="relative min-h-screen overflow-hidden bg-black">
        <StarsBackground />
        <div className="relative z-10">
          <Display />
        </div>
      </main>
    </>
  );
}

export default App;
