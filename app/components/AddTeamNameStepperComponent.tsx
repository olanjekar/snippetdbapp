"use client";
import React from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";

import { TextField } from "@mui/material";

export default function AddTeamNameStepperComponent({
  onInputChange,
  teamName,
}: any) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label className="font-bold" style={{ fontWeight: "bold" }}>
          Enter Team Name:
        </label>
        <TextField
          className="mt-2"
          fullWidth
          size="small"
          id="outlined-basic"
          label="Enter Team Name"
          variant="outlined"
          value={teamName}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
    </div>
  );
}
