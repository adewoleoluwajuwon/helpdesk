"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TicketDetails({ params }) {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/adewoleoluwajuwon/helpdesk-data/tickets/${params.id}`
    )
      .then((res) => res.json())
      .then(setTicket)
      .catch(() => setTicket({ title: "Error loading ticket", body: "" }));
  }, [params.id]);

  if (!ticket) return <p>Loading...</p>;

  return (
    <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl p-6 bg-white dark:bg-gray-800 shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">{ticket.title}</h2>
        <p>{ticket.body}</p>
      </motion.div>
    </main>
  );
}
