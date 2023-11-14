"use client";
import React, { useEffect } from "react";
import { environment } from "../lib/environment";
import { fetcher } from "../lib/fetcher";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { AuthState, setLoggedIn } from "../redux/features/auth-slice";
import { useRouter } from "next/navigation";

export type AuthStateProtectedRouteResponse = {
  status: boolean;
  message: string;
  data: AuthState;
};
export default function CheckAuthComponent({
  pageFromSignIn,
}: {
  pageFromSignIn: boolean;
}) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  

  useEffect(() => {
    const getMe = async () => {
      const [error, user] = await fetcher<AuthStateProtectedRouteResponse>(
        `${environment.apiUrl}/api/auth/protected`
      );
      if (!error && user && user.status) {
        dispatch(setLoggedIn(true));
        router.push("/dashboard");
      } else {
        localStorage.clear();
        if (pageFromSignIn) {
          //do nothing
        } else {
          router.push("/signin");
        }
      }
    };

    if (!isAuth) getMe();
  }, [isAuth,router,pageFromSignIn,dispatch]);

  return null;
}
