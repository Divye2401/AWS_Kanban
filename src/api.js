const API_BASE_URL =
  "https://u52d8j34ka.execute-api.us-east-1.amazonaws.com/prod";
const USER_ID = "default-user"; // In a real app, this would come from authentication

export const taskAPI = {
  // Get all tasks for the user
  async getTasks() {
    console.log(
      "🚀 Calling GET API:",
      `${API_BASE_URL}/tasks?userId=${USER_ID}`
    );
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?userId=${USER_ID}`);
      console.log("📡 API Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const boards = await response.json();
      console.log("✅ Tasks loaded from API:", boards);
      return boards;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Return default boards if API fails
      return [
        { id: 1, title: "Todo", tasks: [] },
        { id: 2, title: "In Progress", tasks: [] },
        { id: 3, title: "Done", tasks: [] },
      ];
    }
  },

  // Save all tasks for the user
  async saveTasks(boards) {
    console.log(
      "💾 Calling POST API:",
      `${API_BASE_URL}/tasks?userId=${USER_ID}`
    );
    console.log("📤 Sending data:", boards);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?userId=${USER_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(boards),
      });

      console.log("📡 Save API Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Tasks saved successfully:", result);
      return result;
    } catch (error) {
      console.error("Error saving tasks:", error);
      throw error;
    }
  },
};
