"use client";
import React, { useState } from "react";
import { poster } from "../lib/fetcher";
import { Box, Button, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiUrl } from "../config/config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteCategory } from "../redux/features/team-slice";
import { useRouter } from "next/navigation";

interface DeleteCategoryComponentProps {
  categoryId: string;
  categoryName: string;
  teamName: string;
  teamId: string;
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

export default function DeleteCategoryComponent({
  categoryId,
  categoryName,
  teamName,
  teamId,
}: DeleteCategoryComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteCategory = async () => {
    let body = {
      id: categoryId,
    };
    const [error, data] = await poster<any>(
      `${apiUrl}/api/snippet/deleteCateogry`,
      body
    );

    if (data && data.status) {
      dispatch(
        deleteCategory({
          categoryId: categoryId,
          teamId: teamId,
        })
      );
      return router.push("/dashboard");
    }

    handleClose();
  };
  return (
    <>
      <button
        className="deleteIconClass bg-[#F5F5F4] border border-[#E7E5E4] mt-1 mb-1 p-1 text-xs rounded-full cursor-pointer"
        onClick={handleOpen}
      >
        <span>
          <DeleteIcon sx={{ fontSize: 13 }} />
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
              <div className="text-xs mb-3">{teamName}</div>

              <p>
                Are you sure, you want to delete{" "}
                <b>
                  <u>{categoryName}</u>
                </b>{" "}
                category
              </p>
              <Button
                className="mt-3"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleDeleteCategory}
              >
                Delete Category
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
