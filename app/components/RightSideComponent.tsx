'use client'
import React, { useState, useEffect } from "react";
import { fetcher } from "../lib/fetcher";
import { apiUrl } from "../config/config";

export default function RightSideComponent() {
  useEffect(() => {
    async function snippetSearchQuery(query: string) {
      const [error, data] = await fetcher<any>(
        `${apiUrl}/api/snippet/snippetSearchQuery?search=${query}`
      );
      console.log("DATA +> ",data)
    }
    snippetSearchQuery("Find the maximum number in an array");
  }, []);
  return null;
}
