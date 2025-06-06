"use client";

import Image from "next/image";
import { useState } from "react";
import { Navlink } from "./navlink";

export function Navbar() {
  const links = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/about" },
    { name: "Productos", href: "/products/all" },
    { name: "Contacto", href: "/contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/logo.svg"
            className="h-8"
            alt="AlvaStore Logo"
            width={50}
            height={20}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            AlvaStore
          </span>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${!isOpen && "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links.map(({ name, href }) => (
              <Navlink name={name} href={href} key={name} />
            ))}
            <li>
              <a
                href="/cart"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <div className="relative w-8 h-8 md:w-6 md:h-6">
                  <Image
                    alt="cart"
                    src="/cart.svg"
                    fill
                    className="object-contain filter invert dark:invert-0"
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
