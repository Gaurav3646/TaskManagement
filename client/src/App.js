import React, { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./redux/thunks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Update from "./components/Update/Update";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <Router>
      <Header />
      <Routes path="/">
        <Route
          index
          path="/"
          element={
            <Tasks
              items={tasks}
              loading={isLoading}
              error={error}
              onFetch={() => {}}
            />
          }
        />
        <Route path="/create" element={<NewTask onAddTask={() => {}} />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
  );

  // return (
  //   <React.Fragment>
  //     <NewTask onAddTask={taskAddHandler} />
  //     <Tasks
  //       items={tasks}
  //       loading={isLoading}
  //       error={error}
  //       onFetch={fetchTasks}
  //     />
  //   </React.Fragment>
  // );
}

export default App;
