import Container from "@/components/common/Container";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen pt-10 pb-20 px-4 bg-[#F2F5F7] md:px-6 lg:px-8">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-8">{t("aboutUs")}</h1>

        <div className="space-y-6 text-lg text-[#404040]">
          <p>{t("aboutPara1")}</p>

          <p>{t("aboutPara2")}</p>

          <p>{t("aboutPara3")}</p>

          <p>{t("aboutPara4")}</p>

          <p>{t("aboutPara5")}</p>

          <p>{t("aboutPara6")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="h-[265px] flex flex-col items-center justify-center text-center p-6 bg-[#FDFDFD] rounded-lg py-5">
            <div className="bg-[#DAEDF2] w-[96px] h-[96px] mx-auto rounded-sm flex items-center justify-center mb-4">
              <Image
                src="/about/a1.png"
                alt="Tools icon"
                width={48}
                height={48}
                className="text-blue-500"
              />
            </div>
            <h3 className="text-2xl text-[#101010] font-semibold mb-2">
              Start thinking circular
            </h3>
            <p className="text-base text-[#101010]">
              Let&apos;s take technology further. It&apos;s good for the planet
              and your wallet.
            </p>
          </div>

          <div className="h-[265px] flex flex-col items-center justify-center text-center p-6 bg-[#FDFDFD] rounded-lg py-5">
            <div className="bg-[#DAEDF2] w-[96px] h-[96px] mx-auto rounded-sm flex items-center justify-center mb-4">
              <Image
                src="/about/a2.png"
                alt="Gift box icon"
                width={48}
                height={48}
                className="text-blue-500"
              />
            </div>
            <h3 className="text-2xl text-[#101010] font-semibold mb-2">
              Performs like new
            </h3>
            <p className="text-base text-[#101010]">
              Reliable, high-quality phones refurbished by our experts in
              Europe.
            </p>
          </div>

          <div className="h-[265px] flex flex-col items-center justify-center text-center p-6 bg-[#FDFDFD] rounded-lg py-5">
            <div className="bg-[#DAEDF2] w-[96px] h-[96px] mx-auto rounded-sm flex items-center justify-center mb-4">
              <Image
                src="/about/a3.png"
                alt="Delivery truck icon"
                width={48}
                height={48}
                className="text-blue-500"
              />
            </div>
            <h3 className="text-2xl text-[#101010] font-semibold mb-2">
              Fast delivery
            </h3>
            <p className="text-base text-[#101010]">
              Full, money-back guarantee, free returns & a 12-month warranty
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
