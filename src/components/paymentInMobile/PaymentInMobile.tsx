import React, { useState } from "react";

const PaymentInMobile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    postCode: "",
    shippingAddress: "",
    appointments: "",
    country: "",
  });
  return (
    <div className="z-20 min-h-screen relative bg-[url('/sell/back_sell.png')] bg-cover bg-center overflow-hidden">
      {/* Diagonal lines background */}
      <div className="absolute inset-0 opacity-10" />

      <div className="p-5">
        {/* Personal Information */}
        <h2 className="text-lg font-semibold text-[#FFFFFF]">
          Personal information
        </h2>

        <div className="w-full mx-auto h-1 border-b-2 border-b-[#FDFDFD] mb-5" />

        <form className="bg-[#FDFDFD] p-3 rounded-lg space-y-3 mb-5">
          <div className="flex items-center gap-6">
            <div className="flex-1 flex flex-col gap-1 w-[45%] max-w-[50%]">
              <label htmlFor="firstName" className="text-sm leading-[21px]">
                First Name <span className="text-red-500">*</span>{" "}
              </label>

              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                id="firstName"
                className="px-2 py-5 h-10 border-2 rounded-md"
                placeholder="First Name"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 w-[45%] max-w-[50%]">
              <label htmlFor="lastName" className="text-sm leading-[21px]">
                Last Name <span className="text-red-500">*</span>{" "}
              </label>

              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                id="lastName"
                className="px-2 py-5 h-10 border-2 rounded-md"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-sm leading-[21px]">
              Email <span className="text-red-500">*</span>{" "}
            </label>

            <input
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              id="email"
              className="px-2 py-5 h-10 border-2 rounded-md"
              placeholder="Enter email"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="phone" className="text-sm leading-[21px]">
              Phone Number <span className="text-red-500">*</span>{" "}
            </label>

            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              id="phone"
              className="px-2 py-5 h-10 border-2 rounded-md"
              placeholder="Phone Number"
            />
          </div>
        </form>

        {/* Address */}

        <h2 className="text-lg font-semibold text-[#FFFFFF]">Address</h2>
        <div className="w-full mx-auto h-1 border-b-2 border-b-[#FDFDFD] mb-5" />
        <form className="bg-[#FDFDFD] p-3 rounded-lg space-y-3 mb-5">
          <div className="flex items-center gap-6">
            <div className="flex-1 flex flex-col gap-1 w-[45%] max-w-[50%]">
              <label htmlFor="city" className="text-sm leading-[21px]">
                City <span className="text-red-500">*</span>{" "}
              </label>

              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                id="city"
                className="px-2 py-5 h-10 border-2 rounded-md"
                placeholder="City"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 w-[45%] max-w-[50%]">
              <label htmlFor="postalCode" className="text-sm leading-[21px]">
                Postal Code <span className="text-red-500">*</span>{" "}
              </label>

              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, postCode: e.target.value })
                }
                id="postalCode"
                className="px-2 py-5 h-10 border-2 rounded-md"
                placeholder="Postal Code"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="shippingAddress" className="text-sm leading-[21px]">
              Shipping Address <span className="text-red-500">*</span>{" "}
            </label>

            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, shippingAddress: e.target.value })
              }
              id="shippingAddress"
              className="px-2 py-5 h-10 border-2 rounded-md"
              placeholder="Shipping Address"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="phone" className="text-sm leading-[21px]">
              Apartment, Staircase, etc. (optional)
            </label>

            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, appointments: e.target.value })
              }
              id="phone"
              className="px-2 py-5 h-10 border-2 rounded-md"
              placeholder="Apartment, Staircase, etc."
            />
          </div>
        </form>

        {/* Payment */}
        <h2 className="text-lg font-semibold text-[#FFFFFF]">Payment</h2>
        <div className="w-full mx-auto h-1 border-b-2 border-b-[#FDFDFD] mb-5" />

        <form className="bg-[#FDFDFD] p-3 rounded-lg space-y-3 mb-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <input type="radio" className="w-6 h-6" />
              <h2 className="text-xs font-medium text-[#101010]">
                Trasferimento Bancario (IBAN)
              </h2>
            </div>
            <h3 className="text-sm font-medium text-[#101010]">$5,00</h3>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <input type="radio" className="w-6 h-6" />
              <h2 className="text-xs font-medium text-[#101010]">
                PayPal: Commissioni $0,10
              </h2>
            </div>
            <h3 className="text-sm font-medium text-[#101010]">$5,00</h3>
          </div>
        </form>
      </div>

      {/* Continue Button */}
      <div className="bg-[#FDFDFD] p-6">
        <button className="w-full h-14 bg-[#FF9934] rounded-lg text-[#FDFDFD] text-base font-semibold">
          CONTINUA
        </button>
      </div>
    </div>
  );
};

export default PaymentInMobile;
