import { Separator } from "@src/components/ui/separator";
import { mywebsite, navlinks } from "@src/data/navlinks";
import Link from "next/link";

const Footer = async () => {
  return (
    <footer>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8">
        <div className="flex items-center gap-5 whitespace-nowrap">
          {navlinks.map((navlink) => (
            <Link
              key={navlink.title}
              href={navlink.href}
              className="opacity-80 transition-opacity duration-300 hover:opacity-100"
            ></Link>
          ))}
        </div>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6">
        <p className="text-center font-medium text-balance">
          {`©${new Date().getFullYear()}`}{" "}
          <Link href={mywebsite} className="hover:underline" target="_blank">
            Arvind .A
          </Link>
          , Made with ❤️ for better web.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
