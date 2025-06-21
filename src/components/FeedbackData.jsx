import { useState, useContext } from "react";
import FeedBackContext from "../store/feedback-form-context";
import FeedbackEntries from "./FeedbackEntries";
import EditModal from "./EditModal";

export default function FeedbackData() {
  const { feedbacks, removeFeedback, editFeedback } =
    useContext(FeedBackContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  function handleDelete(id) {
    removeFeedback(id);
  }

  function handleEdit(feedback) {
    setSelectedFeedback(feedback); // 👈 set data to edit
    setModalOpen(true); // 👈 open modal
  }

  function handleSave(updatedFeedback) {
    editFeedback(updatedFeedback);
  }

  return (
    <>
      {feedbacks.map((feedback) => (
        <FeedbackEntries
          key={feedback.id}
          name={feedback.name}
          rating={feedback.rating}
          category={feedback.category}
          message={feedback.message}
          onEdit={() => handleEdit(feedback)} // ✅ pass the full object
          onDelete={() => handleDelete(feedback.id)}
        />
      ))}

      <EditModal
        open={isModalOpen && !!selectedFeedback}
        onClose={() => setModalOpen(false)}
        initialData={selectedFeedback}
        onSave={handleSave}
      />
    </>
  );
}
