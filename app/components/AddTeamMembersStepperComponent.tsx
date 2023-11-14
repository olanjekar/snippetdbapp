"use client";
import React from "react";
import Button from "@mui/material/Button";

import { TextField } from "@mui/material";
export default function AddTeamMembersStepperComponent({
  addTodo,
  deleteTodo,
  todos,
  newTodo,
  setNewTodo,
}: any) {
  const handleTodoTextField = (e: any) => {
    setNewTodo(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label className="font-bold">Add People:</label>
        <div className="flex flex-row mt-2">
          <TextField
            size="small"
            label="Enter email id"
            variant="outlined"
            fullWidth
            onChange={handleTodoTextField}
            value={newTodo}
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml-2"
            onClick={() => addTodo()}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="todos">
        {todos.map((todo: any) => {
          return (
            <div key={todo.id} className="todo-item">
              <span>{todo.email}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
