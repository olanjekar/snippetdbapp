"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import {
  TeamMembersState,
  addNewTeamMembers,
  addNewTeamName,
  createNewTeam,
} from "@/app/redux/features/team-slice";
import { useAppSelector } from "@/app/hooks/useTypedSelector";

import AddTeamNameStepperComponent from "./AddTeamNameStepperComponent";
import AddTeamMembersStepperComponent from "./AddTeamMembersStepperComponent";
import AddTeamSubmitStepper from "./AddTeamSubmitStepper";
import { poster } from "../lib/fetcher";
import { apiUrl } from "../config/config";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const steps = ["Team Name", "Add Team member", "Submit Team"];

// #60A5FA

export default function AddTeamComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const newTeamState = useAppSelector(
    (state) => state.teamReducer.newTeamMember
  );

  const [open, setOpen] = useState(false);

  const [teamName, setTeamName] = useState("");

  const [todos, setTodos] = useState([] as TeamMembersState[]);
  const [newTodo, setNewTodo] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoObj: TeamMembersState = {
        id: Date.now().toString(),
        email: newTodo,
        isAdmin: 1,
      };
      setTodos([...todos, newTodoObj]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const steps = ["Enter Team Name", "Add Team members", "Submit"];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === 0) {
      dispatch(addNewTeamName(teamName));
    } else if (activeStep === 1) {
      dispatch(addNewTeamMembers(todos));
    } else if (activeStep === steps.length - 1) {
      let [error, res] = await poster<any>(
        `${apiUrl}/api/snippet/createNewTeam`,
        newTeamState
      );

      if (res.status) {
        dispatch(createNewTeam(res.data));
      }
      handleClose();
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AddTeamNameStepperComponent
            onInputChange={(value: string) => setTeamName(value)}
            teamName={teamName}
          />
        );
      case 1:
        return (
          <AddTeamMembersStepperComponent
            addTodo={addTodo}
            deleteTodo={deleteTodo}
            todos={todos}
            newTodo={newTodo}
            setNewTodo={(value: string) => setNewTodo(value)}
          />
        );
      case 2:
        return <AddTeamSubmitStepper value={newTeamState} />;
      // Add cases for more steps
      default:
        return "Unknown step";
    }
  };

  return (
    <div>
      <Button className="!bg-[#60A5FA] !text-white" onClick={handleOpen}>
        Add Team
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className="mt-6">
              {getStepContent(activeStep)}
              <div className="mt-6 flex justify-end items-center">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
