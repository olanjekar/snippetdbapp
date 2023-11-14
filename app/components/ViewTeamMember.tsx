"use client";
import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TeamMembersInTeamState } from "../redux/features/snippet-slice";

interface ViewTeamMemberProps {
  teamsMembers: TeamMembersInTeamState[];
}

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

export default function ViewTeamMember({ teamsMembers }: ViewTeamMemberProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="flex flex-row justify-end w-full">
        <Button
          onClick={handleOpen}
          sx={{ textTransform: "none" }}
          className="!bg-orange-500 !text-white"
        >
          Team member
        </Button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col flex-wrap p-2">
              {teamsMembers.map((member) => {
                return (
                  <p key={member.id} className="flex flex-row gap-2 border border-orange-300 p-1 m-1 rounded-md">
                   <AccountCircleIcon fontSize="small"/>
                    <span>{member.email}</span>
                  </p>
                );
              })}
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
