import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialStateSnippet = {
  categoryid: Number;
  categoryName: string;
  teamid: Number;
  teamName: string;
  teamsMembers: TeamMembersInTeamState[];
  snippets: SnippetState[];
};

export type TeamMembersInTeamState = {
  id: string;
  name: string;
  email: string;
};

export type SnippetState = {
  id: Number;
  title: string;
  description: string;
  codeSnippet: string;
  categoryid: string;
  createdAt: Date;
};

const initialState = {
  categoryid: 0,
  categoryName: "",
  teamid: 0,
  teamName: "",
  teamsMembers: [],
  snippets: [],
} as InitialStateSnippet;

export const snippet = createSlice({
  name: "snippet",
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    setSnippet: (state, action: PayloadAction<InitialStateSnippet>) => {
      return action.payload;
    },
  },
});

export const { setSnippet } = snippet.actions;

export default snippet.reducer;

