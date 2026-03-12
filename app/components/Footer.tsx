const SOCIAL_LINKS = [
  { href: "#", icon: "/instagram.svg", alt: "Instagram" },
  { href: "#", icon: "/x.svg", alt: "X" },
  { href: "#", icon: "/linkedin.svg", alt: "LinkedIn" },
  { href: "#", icon: "/facebook.svg", alt: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-8">
      <div className="mx-auto flex max-w-[1000px] items-center justify-between">
        <p className="uppercase text-[#bbb]" style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em" }}>
          &copy; Business Today &middot; International Conference 2026
        </p>
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.alt} href={link.href} className="opacity-40 transition-opacity hover:opacity-100">
              <img src={link.icon} alt={link.alt} className="h-[15px] w-[15px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
