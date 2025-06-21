import "./App.css";
import Header from "./components/Header";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackEntries from "./components/FeedbackEntries";
import FeedBackContext, {
  FeedbackContextProvider,
} from "./store/feedback-form-context";
import useHttp from "./hooks/useHttp";
import { useContext } from "react";
import FeedbackData from "./components/FeedbackData";
// const config = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// };
function App() {
  // const {
  //   data: feedbacks,
  //   isLoading,
  //   error,
  // } = useHttp("http://localhost:3000/api/feedback", config, []);
  return (
    <FeedbackContextProvider>
      <Header />
      <FeedbackForm />
      {/* {isLoading && <p className="loading">Loading feedback...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!isLoading && !error && feedbacks.length === 0 && (
        <p className="no-feedback">No feedback yet.</p>
      )} */}
      <FeedbackData />
    </FeedbackContextProvider>
  );
}

export default App;
