"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useTypedSelector";
import { fetcher, poster } from "@/app/lib/fetcher";
import { SnippetState, setSnippet } from "@/app/redux/features/snippet-slice";
import { Button, TextField } from "@mui/material";
import { apiUrl } from "@/app/config/config";
import { useRouter } from "next/navigation";

export default function CreatesnippetPage({
  params,
}: {
  params: { categoryid: string };
}) {
  const router = useRouter();
  const categoryid = params.categoryid;

  const dispatch = useAppDispatch();
  const newSnippetState = useAppSelector((state) => state.snippetReducer);

  const [snippetBody, setSnippetBody] = useState({
    title: "",
    description: "",
    codeSnippet: "",
    categoryid: categoryid,
  } as SnippetState);

  useEffect(() => {
    const getSnippetList = async () => {
      const [error, data] = await fetcher<any>(
        `${apiUrl}/api/snippet/getSnippetListWithCategory/${categoryid}`
      );
      dispatch(setSnippet(data.data));
    };

    getSnippetList();
  }, [categoryid,dispatch]);

 

  const handleSubmitSnippet = async () => {
    let body = {
      ...snippetBody,
    };
    const [error, data] = await poster<any>(
      `${apiUrl}/api/snippet/createSnippet`,
      body
    );

    if (data && data.status) {
      let res = data.data;
      router.push(`/dashboard/${res.categoryid}/snippet/${res.snippetId}`);
    }
  };
  ///
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <p>
          {newSnippetState.teamName} {">"} {newSnippetState.categoryName} {">"}{" "}
          Create Snippet
        </p>
        <div className="flex flex-row justify-end first-line mt-4">
          <h3>{newSnippetState.categoryName}</h3>
        </div>
        <div className="bg-white text-black flex flex-col mt-4 p-4 items-center">
          <p className="font-bold">Add Snippet</p>
          <div className="m-4 w-full">
            <label className="font-bold">Enter Title for Snippet:</label>
            <TextField
              className="mt-2"
              fullWidth
              size="small"
              id="outlined-basic"
              label="Enter Snippet Title"
              variant="outlined"
              value={snippetBody.title}
              onChange={(e) =>
                setSnippetBody({ ...snippetBody, title: e.target.value })
              }
            />
          </div>
          <div className="m-4 w-full">
            <label style={{ fontWeight: "bold" }}>
              Enter Description for Snippet:
            </label>
            <TextField
              className="mt-2"
              fullWidth
              size="small"
              multiline
              rows={7}
              id="outlined-basic"
              label="Enter Snippet Description"
              variant="outlined"
              value={snippetBody.description}
              onChange={(e) =>
                setSnippetBody({ ...snippetBody, description: e.target.value })
              }
            />
          </div>

          <div className="m-4 w-full">
            <label style={{ fontWeight: "bold" }}>Enter code snippet:</label>
            <TextField
              className="mt-2"
              fullWidth
              size="small"
              multiline
              rows={7}
              id="outlined-basic"
              label="<div id='snippet'>...</div>"
              variant="outlined"
              value={snippetBody.codeSnippet}
              onChange={(e) =>
                setSnippetBody({ ...snippetBody, codeSnippet: e.target.value })
              }
            />
          </div>
          <div className="m-4 w-full">
            <Button
              fullWidth
              className="!bg-[#60A5FA] !text-white"
              onClick={handleSubmitSnippet}
            >
              Add Snippet
            </Button>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
