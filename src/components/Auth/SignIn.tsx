"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

interface SignInFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      <h2 className="w-full text-center">Sign In</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={signIn}
      >
        {({ errors, touched }) => (
          <Form className="grid gap-2 w-full">
            <label htmlFor="email">Email</label>
            <Field
              className={cn(
                "input",
                errors.email && touched.email && "input-error"
              )}
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-600">{errors.email}</div>
            ) : null}

            <label htmlFor="email">Password</label>
            <Field
              className={cn(
                "input",
                errors.password && touched.password && "input-error"
              )}
              id="password"
              name="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <div className="text-red-600">{errors.password}</div>
            ) : null}

            <div>
              <Link href="/reset-password" className="link text-sm">
                Forgot your password?
              </Link>
            </div>

            <button className="button w-full" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
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
