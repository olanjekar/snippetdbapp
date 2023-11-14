"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/app/hooks/useTypedSelector";
import { fetcher } from "../lib/fetcher";
import {
  TeamsState,
  setTeamListAndCategoryList,
} from "../redux/features/team-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import AddNewCategoryComponent from "./AddNewCategoryComponent";
import CategoryListComponent from "./CategoryListComponent";
import { useRouter } from "next/navigation";
import { apiUrl } from "../config/config";

export interface getTeamAndCategoryOfUserInterface {
  status: number;
  message: string;
  data: TeamsState[];
  error: any;
}

export default function TeamListAndCateogoryList() {
  const [teams, setTeams] = useState();
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const newTeamState = useAppSelector((state) => state.teamReducer.teamMember);

  useEffect(() => {
    const fetchTeamListAndCategoryList = async () => {
      const [error, response] = await fetcher<getTeamAndCategoryOfUserInterface>(
        `${apiUrl}/api/snippet/getTeamAndCategoryOfUser`
      );
  
      if (response && response.data) {
        const teamsData = response.data;
        dispatch(setTeamListAndCategoryList(teamsData));
        for (var i = 0; i < teamsData.length; i++) {
          let category = teamsData[i].categories;
          if (category.length > 0) {
            router.push(`/dashboard/${category[0].id}/snippet`);
          }
        }
      }
    };

    fetchTeamListAndCategoryList();
  }, [dispatch,router]);
 
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {newTeamState.map((team, index) => {
        return (
          <div
            className="flex flex-col border border-[#FBBF24] mx-5 mb-3 rounded"
            key={index}
          >
            <div className="flex flex-row justify-around items-center border-b border-[#FBBF24] py-1 rounded-t-md bg-[#fffbeb]">
              <div className="flex justify-center items-center border border-[#FBBF24] w-10 h-10 rounded-full bg-[#FBBF24]">
                <span>T</span>
              </div>
              <div className="text-sm text-[#92400e]">{team.teamName}</div>
              <div>{/* <ArrowDropDownIcon /> */}</div>
            </div>
            <AddNewCategoryComponent
              teamid={team.id}
              teamName={team.teamName}
            />
            <div className="flex flex-col justify-center">
              {team.categories.map((category, index) => {
                return (
                  <CategoryListComponent
                    key={index}
                    teamId={team.id}
                    teamName={team.teamName}
                    category={category}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
