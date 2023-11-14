"use client";
import React, { useState, useEffect } from "react";
import { poster } from "../lib/fetcher";
import { Box, Button, Modal, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { apiUrl } from "../config/config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { createNewCategoryOnTeam } from "../redux/features/team-slice";

interface AddNewCategoryComponentProps {
  teamid: string;
  teamName: string;
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

export default function AddNewCategoryComponent({
  teamid,
  teamName,
}: AddNewCategoryComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [categoryName, setCategoryName] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitCategory = async () => {
    let body = {
      categoryName: categoryName,
    };
    const [error, res] = await poster<any>(
      `${apiUrl}/api/snippet/createNewCategory/${teamid}`,
      body
    );

    if(res.status){
      dispatch(createNewCategoryOnTeam(res.data))
    }

    console.log("DATA +>",res)

    setCategoryName("");
    handleClose();
  };
  return (
    <>
      <button
        className="bg-white border mt-1 mb-1 text-xs p-1 rounded-full ml-3 mr-3"
        style={{
          border: "1px solid #E7E5E4",
        }}
        onClick={handleOpen}
      >
        <span className="flex flex-row justify-center items-center">
          <AddIcon fontSize="small" />{" "}
          <span className="ml-1">Create Category</span>
        </span>
      </button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col">
              <div className="text-xs">
                {teamName}
              </div>
              <label className="font-bold">Enter Category Name:</label>
              <TextField
                style={{ marginTop: "7px" }}
                fullWidth
                size="small"
                id="outlined-basic"
                label="Enter Category Name"
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <Button
                style={{ marginTop: "7px" }}
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmitCategory}
              >
                Create Category
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
