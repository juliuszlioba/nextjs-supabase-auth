"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import cn from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as Yup from "yup";

import type { Database } from "@/lib/database.types";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

interface SignUpFormValues {
  email: string;
  password: string;
}

const SignUp = () => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => signUp(data);

  async function signUp(formData: SignUpFormValues) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      // redirectTo: `${window.location.origin}/auth/callback`,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Success!");
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center text-xl">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 w-full">
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          placeholder="email@adress.com"
          className={cn("input", errors.email && "input-error")}
        />
        {errors.email ? (
          <div className="text-red-600">{errors.email.message}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          placeholder="min 6 characters"
          type="password"
          className={cn("input", errors.password && "input-error")}
        />
        {errors.password ? (
          <div className="text-red-600">{errors.password.message}</div>
        ) : null}

        <button className="button w-full" type="submit">
          Submit
        </button>
      </form>

      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      {successMsg && (
        <div className="text-blue-700 dark:text-blue-700">{successMsg}</div>
      )}

      <div className="border-t-2 dark:border-gray-700 border-gray-300 pt-4 w-full text-center">
        <Link href="/sign-in" className="link w-full">
          Already have an account? Sign In.
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
