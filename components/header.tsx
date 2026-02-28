"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"adults" | "kids">("adults");

  return (
    <header className="sticky top-0 z-50 bg-foreground text-primary-foreground">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 lg:px-8">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Adults / Kids toggle */}
        <nav className="hidden lg:flex items-center gap-0 mr-4">
          <button
            onClick={() => setActiveTab("adults")}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeTab === "adults"
                ? "bg-primary-foreground text-foreground"
                : "text-primary-foreground hover:text-primary-foreground/80"
            }`}
          >
            Adults
          </button>
          <button
            onClick={() => setActiveTab("kids")}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeTab === "kids"
                ? "bg-primary-foreground text-foreground"
                : "text-primary-foreground hover:text-primary-foreground/80"
            }`}
          >
            Kids
          </button>
        </nav>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="futbolmania home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.futbolmania.com/media/wysiwyg/ImagenesFooter/logo-futbolmania.svg"
            alt="futbolmania"
            className="h-6 lg:h-7 invert"
          />
        </Link>

        {/* Desktop search */}
        <div className="hidden lg:flex flex-1 mx-8 max-w-xl">
          <div className="flex items-center w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent px-4 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/50 outline-none"
              readOnly
            />
            <button className="px-3 py-2 text-primary-foreground/70 hover:text-primary-foreground" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Mobile search */}
          <button className="lg:hidden p-1" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <Link href="#" className="hidden lg:block p-1" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link href="#" className="p-1" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="#" className="p-1 relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Desktop navigation */}
      <DesktopNav />

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <MobileNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

function DesktopNav() {
  const categories = [
    { label: "Football Boots", href: "#" },
    { label: "Clothing", href: "#" },
    { label: "Jerseys", href: "#" },
    { label: "Goalkeeper", href: "#" },
    { label: "Accessories", href: "#" },
    { label: "Balls", href: "#" },
    { label: "Brands", href: "#" },
    { label: "Sale", href: "#", highlight: true },
  ];

  return (
    <nav className="hidden lg:block border-t border-primary-foreground/10">
      <div className="flex items-center justify-center gap-1 px-4 py-0">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-primary-foreground/10 ${
              cat.highlight
                ? "text-fm-yellow hover:text-fm-yellow"
                : "text-primary-foreground"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function MobileNav({
  activeTab,
  setActiveTab,
  onClose,
}: {
  activeTab: "adults" | "kids";
  setActiveTab: (tab: "adults" | "kids") => void;
  onClose: () => void;
}) {
  const categories = [
    "Football Boots",
    "Clothing",
    "Jerseys",
    "Goalkeeper",
    "Accessories",
    "Balls",
    "Brands",
    "Sale",
  ];

  return (
    <div className="lg:hidden fixed inset-0 top-[48px] z-50 bg-foreground text-primary-foreground overflow-y-auto">
      {/* Tab switcher */}
      <div className="flex border-b border-primary-foreground/10">
        <button
          onClick={() => setActiveTab("adults")}
          className={`flex-1 py-3 text-sm font-bold ${
            activeTab === "adults"
              ? "bg-primary-foreground text-foreground"
              : ""
          }`}
        >
          Adults
        </button>
        <button
          onClick={() => setActiveTab("kids")}
          className={`flex-1 py-3 text-sm font-bold ${
            activeTab === "kids"
              ? "bg-primary-foreground text-foreground"
              : ""
          }`}
        >
          Kids
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 outline-none"
            readOnly
          />
          <button className="px-3" aria-label="Search">
            <Search className="h-4 w-4 text-primary-foreground/70" />
          </button>
        </div>
      </div>

      {/* Category list */}
      <ul className="px-0">
        {categories.map((cat) => (
          <li key={cat} className="border-b border-primary-foreground/5">
            <Link
              href="#"
              onClick={onClose}
              className={`block px-6 py-3.5 text-sm font-semibold uppercase tracking-wide ${
                cat === "Sale"
                  ? "text-fm-yellow"
                  : "text-primary-foreground"
              }`}
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>

      {/* User links */}
      <div className="border-t border-primary-foreground/10 mt-4 pt-4 px-6 pb-8">
        <Link href="#" className="flex items-center gap-3 py-3 text-sm font-semibold">
          <User className="h-4 w-4" />
          Sign In
        </Link>
        <Link href="#" className="flex items-center gap-3 py-3 text-sm font-semibold">
          <User className="h-4 w-4" />
          Create Account
        </Link>
      </div>
    </div>
  );
}
