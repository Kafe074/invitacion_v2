import { notFound } from "next/navigation";
import InvitationPage from "@/components/InvitationPage";
import { getGuestBySlug } from "@/data/guests";

export default async function GuestInvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const guest = getGuestBySlug(slug);
  if (!guest) {
    notFound();
  }

  return <InvitationPage guest={guest} />;
}
