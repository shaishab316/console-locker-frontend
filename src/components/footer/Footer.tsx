"use client";

import { Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
// import {
//   LinkedinOutlined,
//   FacebookOutlined,
//   InstagramOutlined,
//   TwitterOutlined,
// } from "@ant-design/icons";
import Container from "../common/Container";

const { Footer } = Layout;

export function ConsoleFooter() {
  return (
    <Footer style={{ background: "#000000", padding: "60px 0 20px" }}>
      <Container>
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center mb-16">
          <div className="flex items-center">
            <div className="relative flex items-center gap-4">
              <Image
                src="/footer-img.png"
                alt="Xbox Series X"
                width={150}
                height={150}
                style={{ objectFit: "contain" }}
                className="hidden md:inline-block absolute -top-28 left-0"
              />
              <h2 className="text-white text-2xl font-semibold ml-0 lg:ml-52">
                Sign Up to Our Newsletter
              </h2>
            </div>
          </div>

          <div className="flex items-center border border-gray-800 rounded-md">
            <input
              className="border-none outline-none bg-transparent text-white px-2.5 py-3"
              type="text"
              placeholder="Enter your email"
            />
            <button className="bg-white text-[#101010] text-base font-medium py-2.5 px-4 md:px-8">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Content */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Payment Methods */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Payment Methods:
            </h4>
            <div className="flex flex-wrap gap-2">
              <Image
                src="/payments/paypal.png"
                alt="PayPal"
                width={50}
                height={30}
              />
              <Image
                src="/payments/visa.png"
                alt="Visa"
                width={50}
                height={30}
              />
              <Image
                src="/payments/mastercard.png"
                alt="Mastercard"
                width={50}
                height={30}
              />
              <Image
                src="/payments/g-pay.png"
                alt="Google Pay"
                width={50}
                height={30}
              />
              <Image
                src="/payments/apple-pay.png"
                alt="Apple Pay"
                width={50}
                height={30}
              />
            </div>

            <h4 className="text-white text-lg font-semibold mt-6 mb-4">
              Social Links
            </h4>
            <div className="flex gap-4">
              <Link href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-linkedin text-xl"></i>
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-facebook text-xl"></i>
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-instagram text-xl"></i>
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-twitter text-xl"></i>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
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
            <div className="space-y-2">
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
            <ul className="space-y-2">
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

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-4">
          © All Rights Reserved 2024 | VAT number IT17743751004 | Via Ogaden 4,
          00199 Rome
        </div>
      </Container>
    </Footer>
  );
}
