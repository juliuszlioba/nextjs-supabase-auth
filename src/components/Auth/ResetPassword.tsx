"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import cn from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as Yup from "yup";

import type { Database } from "@/lib/database.types";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

interface ResetPasswordFormValues {
  email: string;
}

const ResetPassword = () => {
  const supabase = createClientComponentClient<Database>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = (data) =>
    resetPassword(data);

  async function resetPassword(formData: ResetPasswordFormValues) {
    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      {
        redirectTo: `${window.location.origin}/auth/update-password`,
      }
    );

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Password reset instructions sent.");
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center text-xl">Forgot Password</h2>

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

        <button className="button w-full" type="submit">
          Send Instructions
        </button>
      </form>

      {errorMsg && <div className="text-center text-red-600">{errorMsg}</div>}
      {successMsg && <div className="text-center text-black">{successMsg}</div>}

      <div className="border-t-2 dark:border-gray-700 border-gray-300 pt-4 w-full text-center">
        <Link href="/sign-in" className="link">
          Remember your password? Sign In.
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
