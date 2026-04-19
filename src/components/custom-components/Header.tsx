"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@src/components/ui/button";
import MenuDropdown from "@src/components/custom-components/MenuDropDown";
import MenuNavigation, {
  type NavigationSection,
} from "@src/components/custom-components/MenuNavigation";
import { cn } from "@src/lib/utils";
import Link from "next/link";

type HeaderProps = {
  navigationData: NavigationSection[];
  className?: string;
};

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "h-17.5 w-full border-b transition-all duration-300",
        {
          "bg-background shadow-md": isScrolled,
        },
        className
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-primary text-[20px] font-semibold">Real Estate</span>
        </Link>
        <MenuNavigation
          navigationData={navigationData}
          className="max-lg:hidden [&_[data-slot=navigation-menu-list]]:gap-1"
        />
        <div className="flex gap-4">
          <Button className="rounded-full max-sm:hidden" asChild>
            <Link href="/properties">See Properties</Link>
          </Button>
          <div className="flex gap-3">
            <MenuDropdown
              align="end"
              navigationData={navigationData}
              trigger={
                <Button variant="outline" size="icon" className="rounded-full lg:hidden">
                  <MenuIcon />
                  <span className="sr-only">Menu</span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
