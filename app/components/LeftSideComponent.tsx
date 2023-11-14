"use client";

import React, { useEffect } from "react";
import AddTeamComponent from "@/app/components/AddTeamComponent";
import { environment } from "../lib/environment";
import { fetcher } from "../lib/fetcher";
import TeamListAndCateogoryList from "./TeamListAndCateogoryList";

export default function LeftSideComponent() {
  useEffect(() => {
    getTeamMemberAPI();
  }, []);

  const getTeamMemberAPI = async () => {
    const [error, data] = await fetcher(
      `${environment.apiUrl}/api/getTeamMembers`
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Add Team Button Start */}
      <div className="flex flex-row justify-around items-center mb-2">
        <p className="font-bold">Teams</p>
        <AddTeamComponent />
      </div>
      {/* Add Team Button End */}

      {/* Search Team Start */}
      {/* TODO ADD SEARCH FILTER OMKAR */}
      {/* Search Team End */}

      {/* Teams List Start */}
      <div>
        <TeamListAndCateogoryList />
      </div>
      {/* Teams List End */}
    </div>
  );
}
