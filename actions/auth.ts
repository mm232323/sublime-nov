"use server";
import { redirect } from "next/navigation";
import { validate } from "deep-email-validator";
import { signIn } from "next-auth/react";
export async function signup(
  state: unknown,
  event: Iterable<readonly [PropertyKey, unknown]>
) {
  const userData = Object.fromEntries(event) as {
    email: string;
    name: string;
    password: string;
    phone: string;
    job_title: string;
    gender: string;
  };
  const errors = [];
  const isValidEmail = (await validate(userData.email)) as {
    validators: { mx: { valid: boolean } };
  };
  if (userData.name.split(" ").length < 3 || userData.name.length < 9)
    errors.push("name");
  if (!isValidEmail.validators.mx.valid) errors.push("email");
  if (
    userData.password.length < 8 ||
    userData.password.length > 16 ||
    userData.password.includes(" ")
  )
    errors.push("password");
  if (userData.phone.length !== 11) errors.push("phone");
  if (userData.job_title.length <= 2) errors.push("job_title");
  if (userData.gender == "Gender") errors.push("gender");
  if (errors.length) return errors;
  const checkUser = await fetch("http://localhost:5800/auth/check-user", {
    method: "POST",
    body: JSON.stringify({ email: userData.email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const isExist = (await checkUser.json()).isExist;
  if (isExist) return ["emailExists"];
  await fetch("http://localhost:5800/auth/new-user", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  redirect("/login");
}
export async function login(
  state: unknown,
  event: Iterable<readonly [PropertyKey, unknown]>
) {
  const userData = Object.fromEntries(event) as {
    email: string;
    password: string;
  };
  const res = await signIn("credentials", {
    email: userData.email,
    password: userData.password,
    redirect: false,
  });
  if (res?.error) console.log({ message: res.error });
  redirect("/");
}
