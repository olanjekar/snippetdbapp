"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import codingImg from "@/public/images/coding.png";

import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import HeaderComponent from "./components/HeaderComponent";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <HeaderComponent />
      <div className="flex flex-row">
        <div className="flex basis-[50%] justify-center items-center flex-col bg-slate-200">
          <h2 className="p-0 m-0 mb-2 text-2xl font-bold">
            Where Code Snippets Find a Home
          </h2>
          <h3 className="p-0 m-0 text-right text-xl font-bold">
            - Welcome to SnippetDB!
          </h3>
          <div className="flex flex-row gap-2 mt-10">
            <Button
              className="!bg-[#60A5FA] !text-white mr-3"
              onClick={() => router.push("/signin")}
              sx={{ textTransform: "none" }}
            >
              Sign In
            </Button>
            <Button
              className="!bg-orange-400 !text-white"
              sx={{ textTransform: "none" }}
              onClick={() => router.push("/signup")}
            >
              Create An Account
            </Button>
          </div>
        </div>
        <div className="block basis-[50%]">
          <div className="w-full min-h-[600px] ">
            <Image
              src={codingImg}
              className="w-[550px] h-[550px]"
              alt="college students image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
