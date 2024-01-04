/* eslint-disable no-console */
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

export default function TwitterAuthCallBack() {
  //   const urlParams = new URLSearchParams(window?.location?.search);
  //   const queryCode = urlParams.get("code");
  //   const queryState = urlParams.get("state");
  const { query } = useRouter();
  const handleTwitterAuth = useCallback(async () => {
    try {
      if (query?.state?.includes("clout") && query?.code) {
        const response = await axios.get(
          `http://localhost:8000/api/auth/twitter?code=${query?.code}&state=${query?.state}`
        );
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    } finally {
      //   window.close();
      console.log("done");
    }
  }, [query?.state, query?.code]);

  useEffect(() => {
    handleTwitterAuth();
  }, [handleTwitterAuth]);
  return (
    <div className="w-full h-full mt-[300px] text-center">
      Waiting a moment ...
    </div>
  );
}
