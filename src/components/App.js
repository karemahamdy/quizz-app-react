import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  status: "loading"
};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "dataFailed" };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: "error" });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}

export default App;
