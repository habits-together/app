"use client";

import { emailSignupInDB } from "@/lib/api";
import { useState } from "react";
import LoadingSpinner from "./loadingSpinner";

export default function EmailSignupButton() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error" | "already_signed_up"
  >("idle");
  const [signupNumber, setSignupNumber] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    console.log(email);
    setSubmitStatus("loading");
    emailSignupInDB(email).then((result) => {
      if (result.status === "already_signed_up") {
        setSubmitStatus("already_signed_up");
        setSignupNumber(result.signup_number);
      } else if (result.status === "success") {
        setSubmitStatus("success");
        setSignupNumber(result.signup_number);
      } else {
        setSubmitStatus("error");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-screen flex-col">
      <div className="mx-auto mb-3 flex max-w-screen-sm items-center sm:flex">
        <div className="relative w-full">
          <label htmlFor="email" className="mb-2 hidden text-sm font-medium">
            Email address
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-5 w-5 text-stone-400"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
              <path d="M3 7l9 6l9 -6" />
            </svg>
          </div>
          <input
            className="block w-full rounded-l-lg border border-stone-900 bg-stone-50 p-3 pl-10 text-sm text-black placeholder:text-stone-400 focus:outline-8 dark:border-stone-500 dark:bg-stone-800 dark:text-white"
            placeholder="example@gmail.com"
            type="email"
            id="email"
            name="email"
            required
            style={{
              WebkitBoxShadow: "0 0 0px 1000px transparent inset",
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="focus:ring-primary-300 flex w-28 cursor-pointer justify-center rounded-r-lg border border-black bg-black py-3 text-center text-sm font-medium text-white hover:bg-stone-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-stone-100"
          >
            {submitStatus === "idle" && "Sign up"}
            {submitStatus === "loading" && <LoadingSpinner />}
            {(submitStatus === "success" ||
              submitStatus === "already_signed_up") && <>Signed up &#x2713;</>}
            {submitStatus === "error" && "Error"}
          </button>
        </div>
      </div>
      <div className="mx-auto w-max max-w-full text-center text-xs font-normal text-stone-500 md:text-base dark:text-stone-400">
        {signupNumber === null && (
          <>
            Sign up and we&#039;ll let you know when the app is ready!
            <br />
            We might even give you early access & a special badge &#128064;
          </>
        )}
        {signupNumber !== null && (
          <>
            You {submitStatus === "already_signed_up" ? "were" : "are"} sign up
            number {signupNumber}! 🎉
            {/* add extra line so that layout doesn't shift */}
            <br />
            &nbsp;
          </>
        )}
      </div>
    </form>
  );
}
