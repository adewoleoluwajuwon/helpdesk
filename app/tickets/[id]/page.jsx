import React from "react";
import { notFound } from "next/navigation";
import TicketCard from "./TicketCard"; // ✅ Import your client component

async function getTicket(id) {
  const res = await fetch(
    `https://my-json-server.typicode.com/adewoleoluwajuwon/helpdesk-data/tickets/${id}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return notFound();

  return res.json();
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  // ✅ Hand off rendering to the client component
  return (
    <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <TicketCard ticket={ticket} /> {/* ✅ client-side animation + UI */}
      </div>
    </main>
  );
}
