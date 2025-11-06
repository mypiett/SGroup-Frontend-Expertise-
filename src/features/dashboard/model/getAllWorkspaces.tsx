import axios from "axios";


export const getWorkspaces = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`http://localhost:3000/workspace`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response; 

  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    throw error;
  }
};