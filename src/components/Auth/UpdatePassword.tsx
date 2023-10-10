"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import cn from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import type { Database } from "@/lib/database.types";

const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
});

interface UpdatePasswordFormValues {
  password: string;
}

const UpdatePassword = () => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdatePasswordFormValues>({
    resolver: yupResolver(UpdatePasswordSchema),
  });

  const onSubmit: SubmitHandler<UpdatePasswordFormValues> = (data) =>
    updatePassword(data);

  async function updatePassword(formData: UpdatePasswordFormValues) {
    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Go to Home page
      router.replace("/");
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center text-xl">Update Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 w-full">
        <label htmlFor="password">New Password</label>
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
    </div>
  );
};

export default UpdatePassword;
