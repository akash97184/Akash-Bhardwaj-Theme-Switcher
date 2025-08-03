import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Contact = () => {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.initialTheme
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const themeStyles =
    currentTheme === "dark"
      ? "bg-[var(--product-dark-color)] text-white"
      : currentTheme === "colorful"
      ? "bg-white/50 text-black/80"
      : "bg-white text-gray-800";

  const inputStyles =
    currentTheme === "dark"
      ? "bg-gray-800 text-white border-gray-600"
      : currentTheme === "colorful"
      ? "bg-white text-gray-800 border-purple-400"
      : "bg-white text-gray-800 border-gray-300";

  const labelStyles =
    currentTheme === "colorful"
      ? "text-black"
      : currentTheme === "dark"
      ? "text-gray-300"
      : "text-gray-700";

  const buttonStyles =
    currentTheme === "colorful"
      ? "bg-gradient-to-r from-pink-500 to-indigo-400 text-white"
      : currentTheme === "dark"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Message Sent Successfully");
    // Optionally reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div
      className={cn(
        ` max-w-3xl mx-auto px-6 py-10 my-10 text-center rounded-xl backdrop-blur-md shadow-md`,
        themeStyles
      )}>
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg mb-8">
        We'd love to hear from you! Whether it's feedback, questions, or
        suggestions, feel free to drop us a message.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className={`block mb-1 text-sm font-medium ${labelStyles}`}>
            Name
          </label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-md ${inputStyles}`}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className={`block mb-1 text-sm font-medium ${labelStyles}`}>
            Email
          </label>
          <input
            type="email"
            className={`w-full px-4 py-2 border rounded-md ${inputStyles}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className={`block mb-1 text-sm font-medium ${labelStyles}`}>
            Message
          </label>
          <textarea
            className={`w-full px-4 py-2 border rounded-md ${inputStyles}`}
            rows={4}
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`px-6 py-2 cursor-pointer font-medium rounded ${buttonStyles}`}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
