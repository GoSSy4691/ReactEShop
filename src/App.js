import "./App.css";
import {makeFire} from "./logoGoose/images.js"
import {myImg} from "./logoGoose/images.js";
import {showList} from "./axios/toDoList.js";
import "./axios/windowList.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="parent">
          {myImg()}
        </p>
        <div className={"App-header2"}>
          It goose TIME
          &nbsp;
          <button onClick={makeFire} >
            Activate Lasers
          </button>
          <div>
            {showList()}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;