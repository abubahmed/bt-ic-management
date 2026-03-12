import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export default function Navbar({ links }: { links: NavLink[] }) {
  return (
    <nav className="bg-white">
      <div className="mx-auto flex max-w-[1000px] items-center justify-between px-6 py-5">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5c957f757d0c915ad112fef4/1584913272650-8DUV16B9S2TX3W35LT9M/Logo+1+-+small+no+space-07.png?format=500w"
          alt="International Conference"
          style={{ height: "32px" }}
        />
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`uppercase transition-colors hover:text-[#333] ${link.active ? "text-[#333]" : "text-[#999]"}`}
              style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.25em" }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
