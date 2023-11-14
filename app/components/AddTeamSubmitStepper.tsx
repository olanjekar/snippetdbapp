"use client";
import React from "react";
import { TeamsState } from "../redux/features/team-slice";

interface AddTeamSubmitStepperProps {
  value: TeamsState;
}
export default function AddTeamSubmitStepper({
  value,
}: AddTeamSubmitStepperProps) {
  return (
    <div className="flex flex-col">
      <h4 className="font-bold text-sm">{value.teamName}</h4>
      <div className="mt-2">
        {value.teamMembers.map((member, index) => {
          return (
            <p className="mt-1" key={index}>
              {member.email}
            </p>
          );
        })}
      </div>
    </div>
  );
}
