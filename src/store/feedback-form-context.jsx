import { createContext, useEffect, useReducer } from "react";

const FeedBackContext = createContext({
  feedbacks: [],
  addFeedback: (feedback) => {},
  editFeedback: (id, field, value) => {},
  removeFeedback: (id) => {},
});

function feedbackReducer(state, action) {
  if (action.type === "LOAD_ITEMS") {
    return {
      feedbacks: action.feedbacks,
    };
  }
  if (action.type === "ADD_ITEM") {
    return {
      feedbacks: [...state.feedbacks, { ...action.feedback }],
    };
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      feedbacks: state.feedbacks.filter((f) => f.id !== action.id),
    };
  }

  if (action.type === "EDIT_ITEM") {
    return {
      feedbacks: state.feedbacks.map((f) =>
        f.id === action.feedback.id ? { ...f, ...action.feedback } : f
      ),
    };
  }

  return state; // default fallback
}
export function FeedbackContextProvider({ children }) {
  const [feedbackState, dispatchFeedbackAction] = useReducer(feedbackReducer, {
    feedbacks: [],
  });
  async function loadFeedbacks() {
    try {
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Something went wrong");
      }
      dispatchFeedbackAction({ type: "LOAD_ITEMS", feedbacks: resData });
    } catch (error) {
      console.log(error.message);
    }
  }
  async function addFeedback(feedback) {
    try {
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to add feedback");
      }
      dispatchFeedbackAction({ type: "ADD_ITEM", feedback: resData.feedback });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function removeFeedback(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/feedback/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || "Failed to delete feedback");
      }

      dispatchFeedbackAction({ type: "REMOVE_ITEM", id }); // ✅ Use local id
    } catch (error) {
      console.error("❌ Failed to delete:", error.message);
    }
  }

  async function editFeedback(updatedFeedback) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/feedback/${updatedFeedback.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFeedback), // 🔥 Send full object
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to edit feedback");
      }

      dispatchFeedbackAction({ type: "EDIT_ITEM", feedback: resData.feedback });
    } catch (error) {
      console.error("❌ Failed to edit:", error.message);
    }
  }

  useEffect(() => {
    loadFeedbacks();
  }, []);
  const ctxValue = {
    feedbacks: feedbackState.feedbacks,
    loadFeedbacks,
    addFeedback,
    removeFeedback,
    editFeedback,
  };

  return (
    <FeedBackContext.Provider value={ctxValue}>
      {children}
    </FeedBackContext.Provider>
  );
}

export default FeedBackContext;

// import { createContext, useReducer, useEffect } from "react";

// const FeedbackContext = createContext({
//   feedbacks: [],
//   addFeedback: (feedback) => {},
//   removeFeedback: (id) => {},
//   editFeedback: (id, field, value) => {},
//   loadFeedbacks: () => {},
// });

// function feedbackReducer(state, action) {
//   if (action.type === "SET_ALL") {
//     return {
//       feedbacks: action.feedbacks,
//     };
//   }

//   if (action.type === "ADD_ITEM") {
//     return {
//       feedbacks: [...state.feedbacks, { ...action.feedback }],
//     };
//   }

//   if (action.type === "REMOVE_ITEM") {
//     return {
//       feedbacks: state.feedbacks.filter((f) => f.id !== action.id),
//     };
//   }

//   if (action.type === "EDIT_ITEM") {
//     return {
//       feedbacks: state.feedbacks.map((f) =>
//         f.id === action.id ? { ...f, [action.field]: action.value } : f
//       ),
//     };
//   }

//   return state; // fallback for unknown action types
// }

// export function FeedbackContextProvider({ children }) {
//   const [feedbackState, dispatch] = useReducer(feedbackReducer, {
//     feedbacks: [],
//   });

//   // 🔁 GET all feedbacks
//   async function loadFeedbacks() {
//     try {
//       const response = await fetch("http://localhost:3000/api/feedback");
//       const data = await response.json();
//       dispatch({ type: "SET_ALL", feedbacks: data });
//     } catch (err) {
//       console.error("❌ Failed to load feedbacks:", err.message);
//     }
//   }

//   // ➕ POST new feedback
//   async function addFeedback(feedback) {
//     try {
//       const response = await fetch("http://localhost:3000/api/feedback", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(feedback),
//       });

//       const result = await response.json();
//       dispatch({ type: "ADD_ITEM", feedback: result.feedback });
//     } catch (err) {
//       console.error("❌ Failed to add feedback:", err.message);
//     }
//   }

//   // ❌ Local remove
//   async function removeFeedback(id) {
//     try{
//         const response = await fetch(`http://localhost:3000/api/feedback/${id}`, {
//             method: "DELETE",
//         })
//         dispatch({ type: "REMOVE_ITEM", id });
//     }catch(error){
//       console.error("❌ Failed to delete feedback:", error.message);
//     }
//     // You can also add DELETE request here if backend supports
//   }

//   // ✏️ Local edit
//   async function editFeedback(id, field, value) {
//     try{
//         const response = await fetch(`http://localhost:3000/api/feedback/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({field, value})
//         })
//         dispatch({ type: "EDIT_ITEM", id, field, value });
//     }catch(error){
//       console.error("❌ Failed to edit feedback:", error.message);
//     }
//     // Optional PATCH to backend if needed
//   }

//   useEffect(() => {
//     loadFeedbacks();
//   }, []);

//   const ctxValue = {
//     feedbacks: feedbackState.feedbacks,
//     addFeedback,
//     removeFeedback,
//     editFeedback,
//     loadFeedbacks,
//   };

//   return (
//     <FeedbackContext.Provider value={ctxValue}>
//       {children}
//     </FeedbackContext.Provider>
//   );
// }

// export default FeedbackContext;
