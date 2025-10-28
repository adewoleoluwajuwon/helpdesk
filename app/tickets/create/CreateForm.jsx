"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Label,
  TextInput,
  Select,
  Button,
  Spinner,
  Toast,
} from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      title,
      body,
      priority,
      user_email: "test@isaiah.dev",
    };

    try {
      const res = await fetch(
        "https://my-json-server.typicode.com/adewoleoluwajuwon/helpdesk-data/tickets",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticket),
        }
      );

      if (res.status === 201) {
        setToast({
          show: true,
          type: "success",
          message: "Ticket added successfully!",
        });
        setTitle("");
        setBody("");
        setPriority("low");
        setTimeout(() => {
          router.refresh();
          router.push("/tickets");
        }, 1500);
      } else {
        throw new Error("Failed to add ticket");
      }
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: "Something went wrong. Try again.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast({ show: false, type: "", message: "" }), 2500);
    }
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
      >
        {/* Title */}
        <div>
          <Label htmlFor="title" value="Ticket Title" className="mb-2 block" />
          <TextInput
            id="title"
            type="text"
            required
            placeholder="Enter a descriptive title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Body */}
        <div>
          <Label htmlFor="body" value="Ticket Details" className="mb-2 block" />
          <TextInput
            id="body"
            type="text"
            required
            placeholder="Describe the issue or request"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        {/* Priority */}
        <div>
          <Label
            htmlFor="priority"
            value="Priority Level"
            className="mb-2 block"
          />
          <Select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </Select>
        </div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="text-center mt-4"
        >
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition"
          >
            {isLoading ? "Adding..." : "Add Ticket"}
          </Button>
        </motion.div>
      </motion.form>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Toast>
              {toast.type === "success" ? (
                <HiCheckCircle className="text-green-500 text-2xl" />
              ) : (
                <HiXCircle className="text-red-500 text-2xl" />
              )}
              <div className="ml-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                {toast.message}
              </div>
              {/* <Toast.Toggle /> */}
            </Toast>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
