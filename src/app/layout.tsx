import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";

import { Header } from "@/app/components/header/header";

import "@/assets/styles/global.scss";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Armageddon",
  description: "Взрываем ваши астероиды с 1998 года",
};

const helvetica = localFont({
  src: [
    {
      path: "../assets/fonts/helvetica-bold.eot",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-regular.eot",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/helvetica-regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={helvetica.className}>
        <Providers>
          <Header />

          <div className="page-wrapper">
            <div className="page-bg">
              <Image
                priority
                className="earth-image"
                src="/planeta_zemlia_kosmos_167499_2560x1600 1.jpg"
                alt="My Image"
                width={377}
                height={436}
              />
            </div>
            <div className="page-content">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
