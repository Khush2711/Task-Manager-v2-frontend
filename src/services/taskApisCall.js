import axios from "axios";
import toast from "react-hot-toast";

export async function fetchTask(token) {
  try {

    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task";

    const tasks = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log("Fetch tasks............", tasks);

    return tasks;


  } catch (error) {
    //console.log("Error occured while fetching tasks.....", error);
  }
}

export async function getTaskCountBasedOnStatus(token) {
  try {

    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task/count";

    const tasks = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log("Fetch tasks count............", tasks);
    return tasks;


  } catch (error) {
    //console.log("Error occured while fetching tasks.....", error);
  }
}

export async function createTask(token, body) {
  try {

    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task/create-task";

    //console.log("token.......................", token);

    const tasks = await axios.post(baseUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log("create tasks............", tasks);

    toast.success("Task Created Successfully....");
    return tasks;

  } catch (error) {
    //console.log("Error occured while creating tasks.....", error);
    toast.error(error.message || "Task Creation Failed....")
  }
}

export async function deleteTaskByID(body,token) {
  try {

    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task/delete-task"; 

    //console.log("deleting task......token.......................", token);

    const tasks = await axios.delete(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body
    });

    //console.log("Deleted tasks............", tasks);

    toast.success("Task deleted Successfully....");
    return tasks;

  } catch (error) {
    //console.log("Error occured while deleting tasks.....", error);
    toast.error(error?.response?.data?.message || "Task deleteion Failed....")
  }
}


export async function getTasksByStatusAndUser(body, token) {
  try {
    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task/task/statusAndUser";

    //console.log("Fetching tasks by status and user... Token:", token);

    const response = await axios.post(baseUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    //console.log("Fetched tasks:", response.data?.tasks);
    return response.data;

  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data || error.message);
    toast.error(error.message || "Failed to fetch tasks.");
  }
}

export async function updateTaskAPI(body, token) {
  try {
    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task/update-status";
    //console.log("updateTaskAPI tasks Token:", token);


    const response = await axios.put(baseUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    //console.log("update tasks:", response);
    return response.data;

  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data || error.message);
    toast.error(error.message || "update to fetch task.");
  }
}

export async function updateTaskStatus(body, token) {
  try {
    const baseUrl = import.meta.env.VITE_DOMAIN_URL + "task/update-status";
    //console.log("updateTaskAPI tasks Token:", token);


    const response = await axios.patch(baseUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    //console.log("update tasks status :", response);
    return response.data;

  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data || error.message);
    toast.error(error.message || "Failed to update task.");
  }
}

