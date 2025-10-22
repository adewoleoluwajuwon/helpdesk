"use client";

import React from "react";
import { Card } from "flowbite-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  // Sample data
  const stats = [
    { label: "Open Tickets", value: 42, color: "bg-blue-500" },
    { label: "Pending Tickets", value: 18, color: "bg-yellow-400" },
    { label: "Resolved Tickets", value: 65, color: "bg-green-500" },
  ];

  const chartData = [
    { name: "Jan", open: 10, pending: 6, resolved: 20 },
    { name: "Feb", open: 7, pending: 4, resolved: 18 },
    { name: "Mar", open: 12, pending: 8, resolved: 25 },
    { name: "Apr", open: 9, pending: 5, resolved: 19 },
  ];

  const recentTickets = [
    {
      id: "#TK-001",
      subject: "Cannot log in",
      status: "Open",
      priority: "High",
    },
    {
      id: "#TK-002",
      subject: "System crash on upload",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: "#TK-003",
      subject: "Request new account",
      status: "Resolved",
      priority: "Low",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:block">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-white">
            HelpDesk
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          {["Dashboard", "Tickets", "Agents", "Reports", "Settings"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600"
              >
                {item}
              </a>
            )
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            + New Ticket
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </h3>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-10 h-10 ${stat.color} rounded-full`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Chart Section */}
        <Card className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Ticket Trends
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="open" fill="#3b82f6" name="Open" />
                <Bar dataKey="pending" fill="#facc15" name="Pending" />
                <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Tickets Table */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Recent Tickets
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700 dark:text-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <tr>
                  <th className="px-4 py-2">Ticket ID</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Priority</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map((t) => (
                  <tr key={t.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-2">{t.id}</td>
                    <td className="px-4 py-2">{t.subject}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          t.status === "Open"
                            ? "bg-blue-100 text-blue-700"
                            : t.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{t.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
