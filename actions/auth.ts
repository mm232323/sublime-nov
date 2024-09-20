"use server";
import { redirect } from "next/navigation";
import { validate } from "deep-email-validator";
export async function signup(
  state: unknown,
  event: Iterable<readonly [PropertyKey, unknown]>
) {
  const userData = Object.fromEntries(event) as {
    email: string;
    name: string;
    password: string;
    phone: string;
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
  const response = await fetch("http://localhost:5800/auth/new-user", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
