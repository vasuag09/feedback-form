import useHttp from "../hooks/useHttp";
import useInput from "../hooks/useInput";
import FeedBackContext from "../store/feedback-form-context";
import Input from "./Input";
import { useContext, useMemo } from "react";
export default function FeedbackForm() {
  // const config = useMemo(
  //   () => ({
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }),
  //   []
  // );
  const name = useInput("");
  const email = useInput("");
  const rating = useInput("Rate");
  const category = useInput("Select");
  const message = useInput("");
  // const { data, isLoading, error, sendRequest, clearData } = useHttp(
  //   "http://localhost:3000/api/feedback",
  //   config,
  //   []
  // );
  const categories = ["Select", "bug", "suggestion", "praise"];
  const ratings = ["Rate", 1, 2, 3, 4, 5];
  const { addFeedback, loadFeedbacks } = useContext(FeedBackContext)
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addFeedback({
      name: name.value,
      email: email.value,
      rating: rating.value,
      category: category.value,
      message: message.value,
    });
    // Optional: reset all fields
    name.reset();
    email.reset();
    rating.reset();
    category.reset();
    message.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Input name="name" label="Name: " type="text" required {...name} />
      </div>
      <div className="form-group">
        <Input name="email" label="Email: " type="email" required {...email} />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" required {...category}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        <select id="rating" name="rating" required {...rating}>
          {ratings.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Type Here..."
          rows="5"
          minLength={20}
          required
          {...message}
        />
      </div>
      <div className="form-button">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
