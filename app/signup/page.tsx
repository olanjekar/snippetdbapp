"use client";

import React, { useState } from "react";
import { postWithOutCredentials } from "@/app/lib/fetcher";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import HeaderComponent from "../components/HeaderComponent";
import CheckAuthComponent from "../components/CheckAuthComponent";
import { apiUrl } from "../config/config";

export default function SignUpPage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [infoMessageStatus, setInfoMessageStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const handleSignUp = async () => {
    setErrorMessage([]);
    setIsLoading(true);
    const [error, data] = await postWithOutCredentials<any>(
      `${apiUrl}/api/auth/signUp`,
      userInfo
    );
    setIsLoading(false);
    if (data && data.status) {
      setInfoMessageStatus(true);
      setInfoMessage(data.message);
      setErrorMessage([]);
    }
    if (error && !error?.response?.data?.status) {
      setErrorMessage(error?.response?.data?.errors);
    }
  };

  return (
    <div className="flex flex-col">
      <CheckAuthComponent pageFromSignIn={true} />
      <HeaderComponent />
      <div className="flex flex-col justify-center items-center">
        <div className="w-[500px] mt-5 border p-5">
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
          {infoMessageStatus ? (
            <p className="flex flex-row justify-center bg-green-500 text-white pl-4 pr-1 py-5 rounded-full">
              {infoMessage}
            </p>
          ) : (
            <div className="mt-4">
              <h3>Sign Up</h3>
              <div className="mt-4">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Enter your name"
                  variant="outlined"
                  size="small"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="mt-4">
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
              <div className="mt-4">
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
              <div className="mt-4">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSignUp}
                  sx={{ textTransform: "none" }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
