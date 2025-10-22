import React from "react";
import AnimatedTicketCard from "./TicketCard"; // 👈 Client Component below

async function getTicket(id) {
  const res = await fetch("http://localhost:4000/tickets/" + id, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch ticket");
  return res.json();
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedTicketCard ticket={ticket} />
      </div>
    </main>
  );
}
