"use server";
import { redirect } from "next/navigation";
import { albumType, reportType } from "@/util/types";
import { validate } from "deep-email-validator";
export async function postReport(
  state: unknown,
  event: Iterable<readonly [PropertyKey, unknown]>
) {
  const report = Object.fromEntries(event) as {
    reportType: string;
    reportTitle: string;
    reportMessage: string;
  };
  const errors: reportType = {
    reportType: "",
    reportTitle: "",
    reportMessage: "",
  };

  if (report.reportType == "Select")
    errors.reportType = "please choose report type";
  if (report.reportTitle.length < 5)
    errors.reportTitle = "report title most be greater than 5 letters";
  if (report.reportMessage.length < 10)
    errors.reportMessage = "report message most be greater than 10 letters";
  if (errors.reportType || errors.reportTitle || errors.reportMessage)
    return errors;
  await fetch("http://localhost:5800/report", {
    method: "POST",
    body: JSON.stringify(report),
    headers: {
      "Content-Type": "application/json ",
    },
  });
  redirect("/");
}
export async function postContact(
  state: unknown,
  event: Iterable<readonly [PropertyKey, unknown]>
) {
  const message = Object.fromEntries(event) as {
    contactName: string;
    contactPhone: string;
    contactMessage: string;
    contactEmail: string;
  };
  const email: string = message.contactEmail;
  const emailValidate = (await validate(email)) as {
    validators: { mx: { valid: boolean } };
  };
  const errors = {
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactMessage: "",
  };
  if (message.contactName.split(" ").length < 3)
    errors.contactName = "set your full name";
  if (message.contactPhone.length !== 11)
    errors.contactPhone = "set a valid phone number";
  if (!emailValidate?.validators?.mx.valid)
    errors.contactEmail = "enter valid email";
  if (message.contactMessage.length < 10)
    errors.contactEmail = "contact message most be greater than 10 letters";
  if (
    errors.contactName ||
    errors.contactPhone ||
    errors.contactEmail ||
    errors.contactMessage
  )
    return errors;
  await fetch("http://localhost:5800/contactMessage", {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });
  redirect("/");
}
export async function fetchAlbums() {
  const response = await fetch("http://localhost:5800/random-albums");
  const albums: { albums: albumType[] } = await response.json();
  return albums.albums;
}
