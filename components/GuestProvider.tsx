"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Guest = {
  id: string;
  slug: string;
  householdName: string;
  members: string[];
  invitedEvents: string[];
  maxCompanions: number;
};

const GuestContext = createContext<Guest | null>(null);

export function GuestProvider({
  guest,
  children,
}: {
  guest: Guest | null;
  children: ReactNode;
}) {
  return (
    <GuestContext.Provider value={guest}>{children}</GuestContext.Provider>
  );
}

export function useGuest() {
  return useContext(GuestContext);
}
