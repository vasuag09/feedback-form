export default function FeedbackEntries({ name, rating, category, message, onEdit, onDelete }) {
  return (
    <div className="feedback-entry">
      <h3>{name}</h3>
      <p className="meta">
        <span>⭐ {rating}</span>
        <span>• {category}</span>
      </p>
      <p className="message">{message}</p>
      
      <div className="actions">
        <button className="edit-btn" onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

