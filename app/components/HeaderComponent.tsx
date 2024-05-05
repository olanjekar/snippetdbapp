"use client";

import { useAppSelector } from "@/app/hooks/useTypedSelector";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "../redux/store";
import { logOut } from "../redux/features/auth-slice";
import { poster } from "../lib/fetcher";
import { apiUrl } from "../config/config";

export default function HeaderComponent() {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const userName = useAppSelector((state) => state.authReducer.value.name);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    const [error, response] = await poster<any>(`${apiUrl}/api/auth/logout`);
    dispatch(logOut());
    router.push("/signin");
  };
  return (
    <div className="flex flex-row border-b border-[#E7E5E4]">
      <div className="basis-[25%] flex justify-center items-center border-r border-[#E7E5E4] py-5">
        <div className="p-3 border border-[#E7E5E4] rounded-[50px]">
          <h1 className="font-bold text-xl">SnippetDB</h1>
        </div>
      </div>
      <div className="basis-[40%] flex justify-center items-center px-5">
        {/*search  feature has not been develop  till then set to  false */}
        {false && (
          <div className="border border-[#E7E5E4] flex flex-row w-full rounded-full">
            <input
              className="p-3 basis-[70%] border-none text-base bg-[#F5F5F4]"
              style={{ borderRadius: "50px 0 0 50px" }}
              type="text"
              placeholder="Search your database..."
            />
            <button
              className="border-none p-3 basis-[30%] border-l border-[#E7E5E4] bg-white cursor-pointer"
              style={{
                borderRadius: "0px 50px 50px 0px",
              }}
            >
              Search
            </button>
          </div>
        )}
      </div>
      <div
        
        className="flex flex-row justify-center items-center basis-[35%] border border-[#E7E5E4]"
      >
        <div className="flex flex-row justify-center items-center pt-5 pb-5">
          {isAuth ? (
            <div className="flex flex-row gap-4 items-center">
              <span className="border-2 border-[#E7E5E4]  p-2 rounded-full">{userName}</span>
              <button
                className="border-2 border-sky-600  bg-sky-600 text-white  py-1 px-2 rounded hover:bg-white   hover:text-sky-600 "
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-row gap-4 ">
              <Link
                className="border-2 border-sky-600  bg-sky-600 text-white  py-1 px-2 rounded hover:bg-white   hover:text-sky-600 "
                href={"/signin"}
              >
                Sign In
              </Link>
              <Link
                className="border-2 border-sky-600  bg-sky-600 text-white  py-1 px-2 rounded hover:bg-white   hover:text-sky-600 "
                href={"/signup"}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
