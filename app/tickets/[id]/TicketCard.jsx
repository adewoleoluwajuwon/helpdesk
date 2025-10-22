"use client";

import { motion } from "framer-motion";
import { Card, Badge, Button } from "flowbite-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AnimatedTicketCard({ ticket }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "failure";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "info";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Link href="/tickets">
          <Button color="gray" pill>
            <ArrowLeft size={18} className="mr-1" />
            Back to Tickets
          </Button>
        </Link>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Ticket Details
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {ticket.title || "Untitled Ticket"}
            </h3>
            <p className="text-sm text-gray-500">
              Created by{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {ticket.user_email}
              </span>
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {ticket.body}
          </p>

          <div className="mt-4">
            <Badge color={getPriorityColor(ticket.priority)} size="sm">
              {ticket.priority} priority
            </Badge>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
