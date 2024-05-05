import {createSlice,PayloadAction} from "@reduxjs/toolkit";



type InitialState = {
    value:AuthState,
    isAuth:boolean,
}

export type AuthState = {
    id:string,
    name:string,
    email:string,
}


const initialState = {
    isAuth:false,
    value:{
        id:"",
        name:"",
        email:"",
    } as AuthState
} as InitialState


export const auth = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        logOut : () =>{
            return initialState;
        },
        logIn :(state,action:PayloadAction<AuthState>)=>{
            return {
                isAuth:true,
                value:{
                    id:action.payload.id,
                    name:action.payload.name,
                    email:action.payload.email
                }
            }
        },

        // setLoggedIn:(state,action:PayloadAction<InitialState>)=>{
        //     return {
        //         ...state,
        //         isAuth:action.payload.isAuth,
        //         user:action.payload.value.name,
        //         email:action.payload.value.email,
        //         id:action.payload.value.id
        //     }
        // }

        

    }
})

export const {logIn,logOut} = auth.actions;

export default auth.reducer;
