import { useEffect, useReducer } from "react";
import Header from "./Header";
import  Main  from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question"

const initialState = {
  questions: [],
  status: "loading"
};

function reducer(state, action) {
  console.log("Reducer called with action:", action.type);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
      case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("Fetching data...");
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  console.log("Current status:", status);
  console.log("Number of questions:", questions.length);

  return (
    <div className="app"  key={status}>
      <Header />
      <Main>
  {status === "loading" && <Loader />}
  {status === "error" && <Error />}
  {status === "ready" && <StartScreen numQuestions={questions.length} dispatch={dispatch} />}
  {status === "active" && <Question/> }
</Main>
    </div>
  );
}

export default App;