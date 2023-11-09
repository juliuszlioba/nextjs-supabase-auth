"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import cn from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as Yup from "yup";

import type { Database } from "@/lib/database.types";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

interface SignInFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormValues>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => signIn(data);

  async function signIn(formData: SignInFormValues) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center text-xl">Sign In</h2>

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

        <div>
          <Link href="/reset-password" className="link text-sm">
            Forgot your password?
          </Link>
        </div>

        <button className="button w-full" type="submit">
          Submit
        </button>
      </form>

      {errorMsg && <div className="text-red-600">{errorMsg}</div>}

      <div className="border-t-2 dark:border-gray-700 border-gray-300 pt-4 w-full text-center">
        <Link href="/sign-up" className="link w-full">
          Don&apos;t have an account? Sign Up.
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
