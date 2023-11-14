"use client";
import React from "react";
import Link from "next/link";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";

import { CategoryState } from "../redux/features/team-slice";
import DeleteCategoryComponent from "./DeleteCategoryComponent";

interface CategoryListComponentProps {
  category: CategoryState; // Change 'TeamsState' to the actual type of 'value'
  teamName: string;
  teamId: string;
}

export default function CategoryListComponent({
  category,
  teamName,
  teamId,
}: CategoryListComponentProps) {
  return (
    <div className="flex flex-row text-xs justify-between items-center ml-3 mr-3 pb-1 mb-1 category-wrapper">
      <Link
        href={`/dashboard/${category.id}/snippet`}
        className="cursor-pointer no-underline text-black flex flex-row items-center flex-1 pl-3 underline-offset-4  hover:text-blue-600 hover:underline"
        title={category.categoryName}
      >
        <span className="mr-1">
          <MenuBookTwoToneIcon fontSize="small" />
        </span>
        <span>{category.categoryName}</span>
      </Link>
      <div className="flex flex-row  items-center pr-3">
        <DeleteCategoryComponent
          categoryId={category.id}
          teamName={teamName}
          teamId={teamId}
          categoryName={category.categoryName}
        />
      </div>
    </div>
  );
}
