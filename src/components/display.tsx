import Calendar from "./display/calendar";
import StockDisplay from "./display/stockdisplay";
import CharacterCard from "./display/characterdisplay";
import RelationDisplay from "./display/relationdisplay";
import EventDisplay from "./display/eventdisplay";

function Display() {
  return (
    <div>
      <div>
        {" "}
        Naptár: <Calendar />
      </div>
      <div>
        {" "}
        Készletek: <StockDisplay />
      </div>
      <div>
        {" "}
        Emberek: <CharacterCard />
      </div>
      <div>
        Kapcsolat: <RelationDisplay />
      </div>
      <div>
        Esemény: <EventDisplay />
      </div>
    </div>
  );
}

export default Display;
