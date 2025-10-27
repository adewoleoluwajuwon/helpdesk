"use client";

import React, { useEffect, useState } from "react";
import { Card, Badge, Spinner } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// export async function generateStaticParams() {
//   const res = await fetch(
//     "https://my-json-server.typicode.com/adewoleoluwajuwon/helpdesk-data/tickets"
//   );

//   const tickets = await res.json();

//   return tickets.map((ticket) => ({
//     id: tickets.id,
//   }));
// }

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await fetch(
          "https://my-json-server.typicode.com/adewoleoluwajuwon/helpdesk-data/tickets",
          {
            next: { revalidate: 30 },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch tickets");
        const data = await res.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  // Priority-based colors
  const getBadgeColor = (priority) => {
    switch (priority) {
      case "high":
        return "failure"; // red
      case "medium":
        return "warning"; // yellow
      case "low":
        return "success"; // green
      default:
        return "gray";
    }
  };

  const getUnderlineColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        🎟️ Support Tickets
      </h1>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No open tickets, yay! 🎉
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/tickets/${ticket.id}`}
              className="relative"
              onClick={() =>
                setActiveId(activeId === ticket.id ? null : ticket.id)
              }
            >
              <motion.div
                layout
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="cursor-pointer"
              >
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    {ticket.title}
                  </h5>

                  <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
                    {ticket.body.slice(0, 150)}...
                  </p>

                  <div className="flex justify-between items-center">
                    <Badge color={getBadgeColor(ticket.priority)} size="sm">
                      {ticket.priority.toUpperCase()} PRIORITY
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {ticket.user_email}
                    </span>
                  </div>
                </Card>

                {/* Animated underline for active card */}
                <AnimatePresence>
                  {activeId === ticket.id && (
                    <motion.div
                      layoutId="underline"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1.5 rounded-full ${getUnderlineColor(
                        ticket.priority
                      )}`}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
