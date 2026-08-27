"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  getExpectedSessionToken,
  verifyAdminPassword,
} from "@/lib/adminAuth";
import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días
const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    redirect("/admin?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, getExpectedSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin");
}

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function addGuestAction(formData: FormData) {
  const householdName = String(formData.get("householdName") ?? "").trim();
  const membersRaw = String(formData.get("members") ?? "");
  const members = membersRaw
    .split("\n")
    .map((m) => m.trim())
    .filter(Boolean);
  const invitedEvents = formData.getAll("invitedEvents").map(String);
  const maxCompanions = Number(formData.get("maxCompanions") ?? 0);

  if (!householdName || members.length === 0) {
    redirect("/admin?error=guest");
  }

  const slug = `${slugify(householdName)}-${Math.random().toString(36).slice(2, 6)}`;

  const supabase = createServerSupabaseClient();
  await supabase.from("guests").insert({
    slug,
    household_name: householdName,
    members,
    invited_events:
      invitedEvents.length > 0 ? invitedEvents : ["ceremonia", "celebracion"],
    max_companions: maxCompanions,
  });

  redirect("/admin");
}

export async function deleteGuestAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerSupabaseClient();
  await supabase.from("guests").delete().eq("id", id);
  redirect("/admin");
}
