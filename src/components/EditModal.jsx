import Modal from "./Modal";
import { useState,useEffect } from "react";
export default function EditModal({ open, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      message: "",
      rating: "Rate",
      category: "Select",
      id: null,
    }
  );

  // 🔥 This ensures formData updates when new initialData is passed
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
    onClose();
  }
  return (
    <Modal open={open} onClose={onClose}>
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2>Edit Feedback</h2>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
          />
        </label>
        <div className="modal-actions">
          <button type="submit" className="save-btn">
            Save
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
