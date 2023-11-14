"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { poster } from "@/app/lib/fetcher";
import { apiUrl } from "@/app/config/config";
import CheckAuthComponent from "@/app/components/CheckAuthComponent";
import HeaderComponent from "@/app/components/HeaderComponent";

export default function ActivateEmailPage({
  params,
}: {
  params: { jwtToken: string };
}) {
  const jwtToken = params.jwtToken;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const activateUser = async () => {
        setErrors([]);

        let body = {
          jwtToken: jwtToken,
        };
        const [error, data] = await poster<any>(
          `${apiUrl}/api/auth/activateRegisterUser`,
          body
        );
        if (data && data.status) {
          setIsLoading(false);
          router.push("/dashboard");
        }

        if (error) {
          setIsLoading(false);
          setErrors(error.errors);
        }
      };

      activateUser();
    }
  }, [jwtToken,router]);

  return (
    <div>
      <CheckAuthComponent pageFromSignIn={true} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <HeaderComponent />

        {isLoading && (
          <div className="flex flex-row mt-5 justify-center mb-4">
            <span className="loader"></span>
          </div>
        )}
        <div className="mt-4 mx-4  flex flex-row justify-center">
          <div className="w-[500px]">
            {errors &&
              errors.map((error: any, index) => {
                return (
                  <p
                    className="bg-red-500 w-full text-white px-3 py-1 rounded-full"
                    key={index}
                  >
                    {error?.message}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
