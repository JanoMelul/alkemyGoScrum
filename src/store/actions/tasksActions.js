import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types"

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env


export const tasksRequest = () => ({
  type: TASKS_REQUEST,
})

export const tasksSuccess = data => ({
  type: TASKS_SUCCESS,
  payload: data,
})

export const tasksFailure = error => ({
  type: TASKS_FAILURE,
  payload: error,
})




export const getTasks = (path) => dispatch => {
  dispatch(tasksRequest())
  fetch(`${API_ENDPOINT}task/${path}`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('token'),
    },
  })
    .then(res => res.json())
    .then(data => dispatch(tasksSuccess(data.result)))
    .catch(error => dispatch(tasksFailure(error.result)))
}

export const deleteTask = id => dispatch => {
  dispatch(tasksRequest())
  fetch(`${API_ENDPOINT}task/${id}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('token'),
    },
  })
    .then(res => res.json())
    .then(data => dispatch(getTasks("")))
    .catch(error => dispatch(tasksFailure(error.result)))
}

export const editTaskStatus = data => dispatch => {
  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"]

  const newStatusIndex = statusArray.indexOf(data.status) > 1 ? 0 : statusArray.indexOf(data.status) + 1
 
  fetch(`${API_ENDPOINT}task/${data._id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('token'),
    },
    body: JSON.stringify({
        task: {
        title: data.title,
        importance: data.importance,
        status: statusArray[newStatusIndex],
        description: data.description,
      }}
    )
  })
    .then(res => res.json())
    .then(data => dispatch(getTasks("")))
    .catch(error => dispatch(tasksFailure(error.result)))
}