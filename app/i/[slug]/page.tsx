import { notFound } from "next/navigation";
import InvitationPage from "@/components/InvitationPage";
import { createServerSupabaseClient } from "@/lib/supabase/serverClient";
import type { Guest } from "@/components/GuestProvider";

export default async function GuestInvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("guests")
    .select("id, slug, household_name, members, invited_events, max_companions")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const guest: Guest = {
    id: data.id,
    slug: data.slug,
    householdName: data.household_name,
    members: data.members,
    invitedEvents: data.invited_events,
    maxCompanions: data.max_companions,
  };

  return <InvitationPage guest={guest} />;
}
