import React from "react";
import CreateForm from "./CreateForm";

export default function CreateTicket() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-10">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          Add New Ticket
        </h2>
        <CreateForm />
      </div>
    </main>
  );
}
