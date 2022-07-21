import { combineReducers } from "redux";

import { tasksReducer } from "./TasksReducer";

const rootReducer = combineReducers({
  tasksReducer
})

export default rootReducer;