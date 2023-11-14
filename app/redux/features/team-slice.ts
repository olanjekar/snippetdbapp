import { environment } from "@/app/lib/environment";
import { fetcher } from "@/app/lib/fetcher";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CreateNewCategoryType = {
  newCategory: CategoryState;
  teamId: string;
};

export type DeleteCategoryType = {
  teamId:string;
  categoryId:string;
}

export type InitialState = {
  teamMember: TeamsState[];
  newTeamMember: TeamsState;
};

export type TeamMembersState = {
  email: String;
  id: String;
  isAdmin: Number;
};

export type CategoryState = {
  categoryName: string;
  id: string;
};

export type TeamsState = {
  id: string;
  teamName: string;
  teamMembers: TeamMembersState[];
  categories: CategoryState[];
};

const initialState = {
  teamMember: [],
  newTeamMember: {
    teamName: "",
    categories: [],
    teamMembers: [],
    id: "",
  },
} as InitialState;

export const team = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    createNewTeam: (state, action: PayloadAction<TeamsState>) => {
      state.teamMember.unshift(action.payload);
    },
    createNewCategoryOnTeam: (
      state,
      action: PayloadAction<CreateNewCategoryType>
    ) => {
      let teamId = action.payload.teamId;
      let newCategory = action.payload.newCategory;
      let teams = state.teamMember.map((tm) => {
        if (tm.id === teamId) {
          return {
            ...tm,
            categories: [...tm.categories, newCategory],
          };
        } else {
          return { ...tm };
        }
      });

      state.teamMember = teams;
    },
    setTeamListAndCategoryList: (
      state,
      action: PayloadAction<TeamsState[]>
    ) => {
      state.teamMember = action.payload;
    },
    addNewTeamName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        newTeamMember: {
          ...state.newTeamMember,
          teamName: action.payload,
        },
      };
    },
    addNewTeamMembers: (state, action: PayloadAction<TeamMembersState[]>) => {
      return {
        ...state,
        newTeamMember: {
          ...state.newTeamMember,
          teamMembers: action.payload,
        },
      };
    },
    addNewCategory: (state, action: PayloadAction<CategoryState[]>) => {
      return {
        ...state,
        newTeamMember: {
          ...state.newTeamMember,
          categories: action.payload,
        },
      };
    },
    deleteCategory: (state, action: PayloadAction<DeleteCategoryType>) => {
      let teams = state.teamMember.map(team =>{
        if(team.id === action.payload.teamId){
          let categories = team.categories.filter(f => f.id !== action.payload.categoryId)
          team.categories = categories;
        }
        return team;
      })
      state.teamMember = teams;
    }
  },
});

export const {
  addNewTeamName,
  addNewTeamMembers,
  addNewCategory,
  setTeamListAndCategoryList,
  createNewTeam,
  createNewCategoryOnTeam,
  deleteCategory
} = team.actions;

export default team.reducer;

// logIn :(state,action:PayloadAction<string>)=>{
//     return {
//         value:{
//             isAuth:true,
//             username:action.payload,
//             uid:"ksdjflksdflkjw3lskdfj",
//             isModerator:false
//         }
//     }
// },

// toggleModerator :(state) =>{
//     state.value.isModerator  = !state.value.isModerator
// }
