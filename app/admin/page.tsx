import { cookies } from "next/headers";
import { verifyAdminSession, ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";
import { createServerSupabaseClient } from "@/lib/supabase/serverClient";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { addGuestAction, deleteGuestAction, logoutAction } from "./actions";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const cookieStore = await cookies();
  const isAuthed = verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (!isAuthed) {
    return <AdminLogin error={error} />;
  }

  const supabase = createServerSupabaseClient();
  const [{ data: guests }, { data: rsvps }, { data: songs }] = await Promise.all([
    supabase
      .from("guests")
      .select("id, slug, household_name, members, invited_events, max_companions")
      .order("created_at", { ascending: false }),
    supabase
      .from("rsvps")
      .select("id, guest_name, attending_ceremonia, attending_celebracion, companions, notes, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("song_suggestions")
      .select("id, song, artist, suggested_by, created_at")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <AdminDashboard
      guests={guests ?? []}
      rsvps={rsvps ?? []}
      songs={songs ?? []}
      addGuestAction={addGuestAction}
      deleteGuestAction={deleteGuestAction}
      logoutAction={logoutAction}
    />
  );
}
