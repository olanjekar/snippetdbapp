"use client";

import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks/useTypedSelector";
import { useRouter } from "next/navigation";
import { fetcher } from "@/app/lib/fetcher";
import Link from "next/link";
import { Button } from "@mui/material";
import moment from "moment";
import EventNoteIcon from "@mui/icons-material/EventNote";

import DeleteSnippetComponent from "@/app/components/DeleteSnippetComponent";
import { apiUrl } from "@/app/config/config";

export type SnippetDetailsType = {
  id: string;
  fullName: string;
  title: string;
  description: string;
  codeSnippet: string;
  categoryName: string;
  categoryid: string;
  teamName: string;
  teamid: string;
  createdAt: Date;
};

export type SnippetDetailsResponseType = {
  data: SnippetDetailsType;
  status: boolean;
  error: unknown;
  message: string;
};

export default function SnippetDetailsPage({
  params,
}: {
  params: { categoryid: string; snippetid: string };
}) {
  const categoryid = params.categoryid;
  const snippetid = params.snippetid;
  const router = useRouter();
  const [snippetDetailsResponse, setSnippetDetailsResponse] = useState(
    {} as SnippetDetailsResponseType
  );

  const dispatch = useAppDispatch();
  // const newSnippetState = useAppSelector((state) => state.snippetReducer);
  useEffect(() => {
    const getSnippetDetails = async () => {
      const [error, data] = await fetcher<SnippetDetailsResponseType>(
        `${apiUrl}/api/snippet/getSnippetDetails/${snippetid}`
      );
  
      if (data && data.status) {
        setSnippetDetailsResponse(data);
      }
      // dispatch(setSnippet(data.data));
    };

    getSnippetDetails();
  }, [snippetid]);

  

  const getInitials = (fullName: string) => {
    const words = fullName.split(" ");

    let firstNameInitial = "";
    let lastNameInitial = "";

    if (words.length > 0) {
      firstNameInitial = words[0][0].toUpperCase();
    }

    if (words.length > 1) {
      lastNameInitial = words[words.length - 1][0].toUpperCase();
    }

    const initials = firstNameInitial + lastNameInitial;

    return initials;
  };

  if (snippetDetailsResponse && snippetDetailsResponse.status) {
    let snippetDetails = snippetDetailsResponse.data;
    return (
      <div className="w-full ">
        <div className="flex flex-col mb-20">
          <p className="font-bold flex flex-row gap-2 text-slate-400">
            <span>{snippetDetails.teamName}</span>
            <span>{">"} </span>
            <span> {snippetDetails.categoryName}</span>
            <span>{">"}</span>
            <span>{snippetDetails.title}</span>
          </p>

          <div className="flex flex-col mt-5 items-start w-full">
            <div className="bg-white text-black flex flex-col p-4 items-start w-full border border-[#E7E5E4] rounded">
              <div className="flex flex-row items-center gap-2">
                {/* name logo */}
                <div className="border rounded-full p-4">
                  {getInitials(snippetDetails.fullName)}
                </div>
                <div className="flex flex-col ml-1">
                  <p>{snippetDetails.fullName}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    <EventNoteIcon fontSize="small" />
                    {moment(snippetDetails.createdAt).format("Do MMMM YYYY")}
                  </p>
                </div>
              </div>
              <p className="font-bold text-lg mt-4">{snippetDetails.title}</p>

              <p className="mt-2">{snippetDetails.description}</p>
              <div className="flex w-full flex-row justify-end items-center">
                <div>
                  <DeleteSnippetComponent
                    snippetid={snippetDetails.id}
                    snippetName={snippetDetails.title}
                    teamName={snippetDetails.teamName}
                    categoryName={snippetDetails.categoryName}
                    categoryid={snippetDetails.categoryid}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="mb-2 font-bold">Snippet: </div>
                <pre className="bg-black w-full text-white p-2">
                  {snippetDetails.codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return <h3>Loading...</h3>;
  }
}
