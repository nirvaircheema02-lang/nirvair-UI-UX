import { useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../../lib/site";
import { ContactSheet } from "./ContactSheet";

const navItems = [
  { label: "Work", href: "/#work", internal: false },
  { label: "About", href: "/#about", internal: false },
];

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const ticking = useRef(false);
  const reduceMotion = useReducedMotion();

  const isHome = pathname === "/";
  const dark = isHome && !compact;

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setCompact(window.scrollY > 96);
        ticking.current = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dur = reduceMotion ? "0ms" : "260ms";
  const ease = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
        >
          Skip to content
        </a>

        <div
          className="flex justify-center"
          style={{
            padding: compact ? "0.75rem 1rem 0" : "0",
            transition: `padding ${dur} ${ease}`,
          }}
        >
          <nav
            className={`flex w-full items-center justify-between ${
              compact
                ? "max-w-2xl rounded-full border border-border bg-canvas/95 px-5 py-2.5 shadow-[0_8px_30px_-12px_rgba(17,17,17,0.18)] backdrop-blur-md"
                : dark
                  ? "max-w-full border-b border-dark-border bg-transparent py-5"
                  : "max-w-full border-b border-border bg-canvas py-5"
            }`}
            style={{
              transition: `background-color ${dur} ${ease}, border-color ${dur} ${ease}, border-radius ${dur} ${ease}, box-shadow ${dur} ${ease}, padding ${dur} ${ease}, max-width ${dur} ${ease}`,
            }}
          >
            <div
              className={`flex w-full items-center justify-between ${
                compact ? "" : "mx-auto max-w-6xl px-6"
              }`}
            >
              <Link
                to="/"
                className={`text-sm font-medium tracking-tight transition-colors ${dark ? "text-dark-ink" : "text-ink"}`}
                onClick={() => setOpen(false)}
              >
                {profile.name}
              </Link>

              <div className="hidden items-center gap-8 md:flex">
                {navItems.map((item) =>
                  item.internal ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`text-sm transition-colors ${dark ? "text-dark-ink-soft hover:text-dark-ink" : "text-ink-soft hover:text-ink"}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`text-sm transition-colors ${dark ? "text-dark-ink-soft hover:text-dark-ink" : "text-ink-soft hover:text-ink"}`}
                    >
                      {item.label}
                    </a>
                  ),
                )}
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-sm transition-colors ${dark ? "text-dark-ink-soft hover:text-dark-ink" : "text-ink-soft hover:text-ink"}`}
                >
                  Resume
                </a>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className={`text-sm font-medium underline underline-offset-4 transition-colors ${
                    dark
                      ? "text-dark-ink decoration-dark-border hover:decoration-accent"
                      : "text-ink decoration-border hover:decoration-accent"
                  }`}
                >
                  Contact
                </button>
              </div>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className={`-mr-1 p-2 transition-colors md:hidden ${dark ? "text-dark-ink" : "text-ink"}`}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className="mx-4 mt-2 border border-border bg-canvas px-6 py-6 shadow-[0_8px_30px_-12px_rgba(17,17,17,0.18)] md:hidden"
          >
            <div className="flex flex-col gap-5">
              <a
                href="/#work"
                className="text-lg text-ink"
                onClick={() => setOpen(false)}
              >
                Work
              </a>
              <a
                href="/#about"
                className="text-lg text-ink"
                onClick={() => setOpen(false)}
              >
                About
              </a>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lg text-ink"
              >
                Resume
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setContactOpen(true);
                }}
                className="text-left text-lg font-medium text-ink"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      <ContactSheet open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
