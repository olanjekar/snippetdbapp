"use client";

import { fetcher } from "@/app/lib/fetcher";
import { useAppSelector, useAppDispatch } from "@/app/hooks/useTypedSelector";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import Button from "@mui/material/Button";
import { setSnippet } from "@/app/redux/features/snippet-slice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import moment from "moment";
import { apiUrl } from "@/app/config/config";
import ViewTeamMember from "@/app/components/ViewTeamMember";

export default function SnippetPage({
  params,
}: {
  params: { categoryid: string };
}) {
  const categoryid = params.categoryid;
  const router = useRouter();

  const dispatch = useAppDispatch();
  const newSnippetState = useAppSelector((state) => state.snippetReducer);
  useEffect(() => {
    const getSnippetList = async () => {
      const [error, data] = await fetcher<any>(
        `${apiUrl}/api/snippet/getSnippetListWithCategory/${categoryid}`
      );
  
      if (data.status) {
        dispatch(setSnippet(data.data));
      }
    };

    getSnippetList();
  }, [categoryid,dispatch]);

  
  return (
    <div className="w-full h-full">
      <div className="flex flex-col mb-20">
        <p className="font-bold">
          {newSnippetState.teamName} {">"} {newSnippetState.categoryName}
        </p>
        <div className="mt-3 flex flex-row justify-between">
          <h3 className="font-bold text-base">
            {newSnippetState.categoryName}
          </h3>
          <div className="flex flex-row gap-2">
            <ViewTeamMember teamsMembers={newSnippetState.teamsMembers} />
            <Button
              onClick={() =>
                router.push(`/dashboard/${categoryid}/createsnippet`)
              }
              sx={{ textTransform: "none" }}
              className="!bg-[#60A5FA] !text-white"
            >
              Add Snippets
            </Button>
          </div>
        </div>
        <div className="flex flex-col mt-5 items-start w-full">
          {newSnippetState?.snippets?.map((snippet, index) => {
            return (
              <div
                key={index}
                className="bg-white text-black flex flex-col p-4 items-start w-full border border-[#E7E5E4] rounded mb-3"
              >
                <Link href={`/dashboard/${categoryid}/snippet/${snippet.id}`}>
                  <p className="font-bold cursor-pointer text-base underline mb-2 text-black hover:text-blue-600">
                    {snippet.title}
                  </p>
                </Link>
                <p>{snippet.description}</p>
                <div className="mt-2 w-full">
                  <p className="flex flex-row justify-end w-full  text-slate-500">
                    <span>
                      CreatedAt:{" "}
                      {moment(snippet.createdAt).format("Do MMMM YYYY")}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
