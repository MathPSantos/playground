import { BlocksIcon } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  {
    label: "Invoice helper",
    href: "/",
  },
];

export function Header() {
  return (
    <header className="border-b">
      <div className="container max-w-screen-2xl flex items-center h-16">
        <div className="flex items-center gap-3">
          <BlocksIcon className="size-6" />
          <strong className="font-semibold text">Playground</strong>
        </div>

        <menu className="ml-auto flex items-center gap-2">
          {NAV_LINKS.map((l) => (
            <li
              key={l.href}
              className="text-sm font-medium text-foreground/60 hover:text-foreground/80 transition-all hover:underline underline-offset-2"
            >
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </menu>
      </div>
    </header>
  );
}
