"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import Image from "next/image";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // const formData = new FormData(event.currentTarget);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F2F5F7] py-12 sm:px-6 lg:px-8">
      <Container>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="col-span-1 lg:col-span-2 bg-[#FDFDFD] p-8 rounded-lg shadow-sm border-4 border-blue-500">
            <h1 className="text-3xl font-semibold text-[#101010] mb-6">
              Personal Information
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col lg:flex-row items-start lg:space-x-6">
                <div className="lg:flex-1 w-full lg:w-1/2">
                  <label
                    htmlFor="fullName"
                    className="text-lg font-medium text-[#101010]"
                  >
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="lg:flex-1 w-full lg:w-1/2">
                  <label
                    htmlFor="email"
                    className="text-lg font-medium text-[#101010]"
                  >
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-lg font-medium text-[#101010]"
                >
                  Your Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className=" text-lg font-medium text-[#101010]"
                >
                  Messages
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Sending..." : "SEND"}
              </button>

              {submitStatus === "success" && (
                <p className="text-green-600 text-sm">
                  Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-sm">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="bg-[#FDFDFD] p-8 rounded-lg shadow-sm border-4 border-red-500">
            <h2 className="text-3xl text-[#101010] font-semibold mb-6">
              Contact Information
            </h2>
            <p className="text-[#2B2B2B] mb-8 text-wrap">
              We&apos;ll create high-quality linkable content and build at least
              40 high-Authority.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-[#DAEDF2] p-2 rounded-full">
                  <Image
                    src={"/contact/phone.png"}
                    width={20}
                    height={20}
                    alt="Phone"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[#2B2B2B] text-base md:text-lg text-wrap">
                    +42 000 000 0000
                  </p>
                  <p className="text-[#2B2B2B] text-base md:text-lg text-wrap">
                    +42 000 000 0000
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-[#DAEDF2] p-2 rounded-full">
                  <Image
                    src={"/contact/email.png"}
                    width={20}
                    height={20}
                    alt="Phone"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[#2B2B2B] text-base md:text-lg text-wrap">
                    support@console.com
                  </p>
                  <p className="text-[#2B2B2B] text-base md:text-lg text-wrap">
                    info@balzlamgames.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-[#DAEDF2] p-2 rounded-full">
                  <Image
                    src={"/contact/map.png"}
                    width={18}
                    height={18}
                    alt="Phone"
                  />
                </div>
                <p className="text-base md:text-lg text-[#101010]">
                  123 Gamer&apos;s Haven Street, Central District,
                  <br />
                  Balzlam, BX 56789
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
