"use client";
import React, { useState } from "react";
import { poster } from "../lib/fetcher";
import { Box, Button, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiUrl } from "../config/config";
import { useRouter } from "next/navigation";

interface DeleteCategoryComponentProps {
  snippetid: string;
  snippetName: string;
  teamName: string;
  categoryName: string;
  categoryid: string;
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

export default function DeleteSnippetComponent({
  snippetid,
  snippetName,
  teamName,
  categoryName,
  categoryid,
}: DeleteCategoryComponentProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteSnippet = async () => {
    let body = {
      id: snippetid,
    };
    const [error, data] = await poster<any>(
      `${apiUrl}/api/snippet/deleteSnippet`,
      body
    );

    if (data && data.status) {
      router.push(`/dashboard/${categoryid}/snippet`);
    }

    handleClose();
  };
  return (
    <>
      <div className="flex flex-row justify-end w-full">
        <button
          className="deleteIconClass  bg-[#F5F5F4] border border-[#E7E5E4] my-3 p-2 text-xs rounded-[50px] cursor-pointer m-3 hover:bg-red-500 hover:text-white "
          onClick={handleOpen}
        >
          <span className="flex flex-row gap-2">
            <span>Delete</span>
            <DeleteIcon sx={{ fontSize: 13 }} />
          </span>
        </button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col">
              <div className="text-xs mb-3">
                {teamName} {" > "} {categoryName}
              </div>

              <p>
                Are you sure, you want to delete{" "}
                <b>
                  <u>{snippetName}</u>
                </b>{" "}
                snippet
              </p>
              <Button
                className="mt-3"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleDeleteSnippet}
              >
                Delete Snippet
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
