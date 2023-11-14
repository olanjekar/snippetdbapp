"use client";

import React, {  useState } from "react";
import {  poster } from "@/app/lib/fetcher";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import { useRouter } from "next/navigation";
import HeaderComponent from "../components/HeaderComponent";
import CheckAuthComponent from "../components/CheckAuthComponent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { setLoggedIn } from "@/app/redux/features/auth-slice";
import { apiUrl } from "../config/config";

export default function SignInPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [infoMessageStatus, setInfoMessageStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleSignIn = async () => {
    setErrorMessage([]);
    setIsLoading(true);
    const [error, data] = await poster<any>(
      `${apiUrl}/api/auth/signIn`,
      userInfo
    );

    setIsLoading(false);
    if (data && data.status) {
      setInfoMessageStatus(true);
      setInfoMessage(data.message);
      setErrorMessage([]);
      dispatch(setLoggedIn(true));
      router.push("/dashboard");
    }

    if (error && !error?.status) {
      setErrorMessage(error?.errors);
    }
  };

  return (
    <>
      {/* <CheckAuthComponent/> */}
      <CheckAuthComponent pageFromSignIn={true} />
      <div className="flex flex-col">
        <HeaderComponent />
        <div className="flex justify-center items-center flex-col">
          <div className="w-[500px] mt-5 border border-[#E7E5E4] p-5">
            {isLoading && (
              <div className="flex flex-row justify-center mb-4">
                <span className="loader"></span>
              </div>
            )}
            {errorMessage &&
              errorMessage.length > 0 &&
              errorMessage.map((error: any, index) => {
                return (
                  <p
                    className="bg-red-500 text-white px-3 py-1 rounded-full"
                    key={index}
                  >
                    {error?.message}
                  </p>
                );
              })}
            <h3 className="mt-4">Sign In</h3>

            <div className="mt-3">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter your email"
                variant="outlined"
                size="small"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </div>
            <div className="mt-3">
              <TextField
                fullWidth
                id="outlined-basic"
                type="password"
                label="Enter your password"
                variant="outlined"
                size="small"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
              />
            </div>
            <div className="mt-3">
              <Button
                fullWidth
                size="small"
                disabled={isLoading}
                variant="contained"
                onClick={handleSignIn}
                sx={{ textTransform: "none" }}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
