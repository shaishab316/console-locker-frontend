"use client";

import { Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import Container from "../common/Container";

const { Footer } = Layout;

export function ConsoleFooter() {
  return (
    // <Footer style={{ background: "#000000", padding: "60px 0 20px" }}>
    <footer className="bg-[#101010]">
      <Container>
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center mb-16 pt-12">
          <div className="w-full flex items-center">
            <div className="relative flex items-center md:gap-4">
              <Image
                src="/footer-img.png"
                alt="Xbox Series X"
                width={150}
                height={150}
                style={{ objectFit: "contain" }}
                className="hidden md:inline-block absolute -top-28 left-0"
              />
              <div className="ml-0 lg:ml-52">
                <h2 className="text-left text-white text-2xl font-semibold">
                  Sign Up to Our Newsletter
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[50%] flex items-center justify-between border border-gray-800 rounded-md">
            <input
              className="border-none outline-none bg-transparent text-white px-2.5 py-3"
              type="text"
              placeholder="Enter your email"
            />
            <button className="place-items-end bg-white text-[#101010] text-base font-medium rounded py-2.5 px-4 md:px-8">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="lg:flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-8 mb-16 pb-8">
          {/* Payment Methods */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-2">
              Payment Methods:
            </h4>
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <Image
                src="/payments/paypal.png"
                // className="h-12 "
                alt="PayPal"
                width={50}
                height={48}
              />
              <Image
                src="/payments/visa.svg"
                // className="h-full"
                alt="Visa"
                width={50}
                height={70}
              />
              <Image
                src="/payments/mastercard.png"
                // className="h-12"
                alt="Mastercard"
                width={50}
                height={48}
              />
              <Image
                src="/payments/g-pay.png"
                // className="h-12"
                alt="Google Pay"
                width={50}
                height={48}
              />
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mt-6 mb-4">
                Social Links
              </h4>
              <div className="flex gap-4">
                <Link href="#" className="text-white hover:text-gray-300">
                  <Image
                    src={"/social/f-linkedin.png"}
                    width={40}
                    height={40}
                    alt="linkedin"
                  />
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Image
                    src={"/social/f-facebook.png"}
                    width={40}
                    height={40}
                    alt="linkedin"
                  />{" "}
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Image
                    src={"/social/f-instragram.png"}
                    width={40}
                    height={40}
                    alt="linkedin"
                  />{" "}
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Image
                    src={"/social/f-x.png"}
                    width={40}
                    height={40}
                    alt="linkedin"
                  />{" "}
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "Buy", "Sell", "About Us", "Reviews"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <div className="space-y-5">
              <div>
                <strong className="text-white block">Email</strong>
                <p className="text-gray-300">info@consolelocker.it</p>
              </div>
              <div>
                <strong className="text-white block">Phone</strong>
                <p className="text-gray-300">+1 234 567 890</p>
              </div>
            </div>
          </div>

          {/* Privacy & Policy */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Privacy & Policy
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/returns-and-refunds"
                  className="text-gray-300 hover:text-white"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-services"
                  className="text-gray-300 hover:text-white"
                >
                  Terms of Services
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-gray-300 hover:text-white"
                >
                  Cookie Policy (EU)
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Copyright */}
      <div className="h-[80px] flex items-center justify-center text-center bg-[#FDFDFD] border-t border-gray-800">
        <p className="text-[#101010] text-sm lg:text-lg">
          {" "}
          © All Rights Reserved 2024 | VAT number IT17743751004 | Via Ogaden 4,
          00199 Rome
        </p>
      </div>
    </footer>
  );
}
