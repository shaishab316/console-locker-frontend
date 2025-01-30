"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";
import Container from "@/components/common/Container";

export default function BlogDetail() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Container className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 my-6">
          Why It's Smarter To Buy A Refurbished iPhone Rather Than A Brand New
          One
        </h1>

        {/* Hero Section */}
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">
          <Image
            src="/hero-banner.png"
            alt="Gaming Console"
            fill
            className="w-1/2 mx-auto object-cover"
            priority
          />
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
          {/* Article Card */}
          <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src={"/clients/client1.png"}
                  width={30}
                  height={30}
                  className="w-8 h-8 bg-gray-200 rounded-full"
                  alt="admin"
                />
                <span>Admin</span>
              </div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-calendar-days"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
              </span>
              <time>19 Jun 2024</time>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <FacebookIcon size={18} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                <TwitterIcon size={18} />
                <span className="hidden sm:inline">Tweet</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                <LinkedinIcon size={18} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors ml-auto"
              >
                <Share2 size={18} />
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p>
                In today's fast-paced technological world, staying up-to-date
                with the latest iPhone models can be an expensive endeavor.
                However, there's a smarter alternative that's gaining popularity
                among savvy consumers: buying refurbished iPhones.
              </p>

              <h2>What Makes Refurbished iPhones a Smart Choice?</h2>

              <p>
                Refurbished iPhones undergo rigorous testing and restoration
                processes to ensure they meet quality standards. These devices
                often come with warranties and offer significant cost savings
                compared to new models, while providing similar functionality
                and features.
              </p>

              <h3>Key Benefits of Choosing Refurbished:</h3>

              <ul>
                <li>Cost savings of up to 40-70% compared to new models</li>
                <li>Environmentally friendly choice that reduces e-waste</li>
                <li>Quality assurance through professional refurbishment</li>
                <li>Warranty coverage for peace of mind</li>
              </ul>

              <p>
                Whether you're budget-conscious or environmentally minded,
                choosing a refurbished iPhone makes perfect sense in today's
                market.
              </p>
            </div>
          </article>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-12">
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Previous Post</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>Next Post</span>
              <ChevronRight size={20} />
            </Link>
          </div>

          {/* Related Posts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Link href="#" key={i} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src="/blogs/blog4.png"
                        alt="Related post thumbnail"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        Why It's Smarter To Buy A Refurbished iPhone Rather Than
                        A Brand New One
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Admin</span>
                        <span>•</span>
                        <time>19 Jun 2024</time>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </Container>
    </div>
  );
}
