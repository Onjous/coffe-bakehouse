"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nav, hoursNote, conceptNotice } from "@/content/site";
import { formatRange, formatTime } from "@/lib/hours";
import { useTodayStatus } from "@/lib/use-today";
import { Wordmark } from "./brand";

function TodayLine({ className = "" }: { className?: string }) {
  const status = useTodayStatus();
  return (
    <p className={`lining text-sm text-ink-soft ${className}`} aria-live="off">
      {status ? (
        <>
          <span
            aria-hidden="true"
            className={`mr-2 inline-block size-[7px] -translate-y-px rounded-full ${status.open ? "bg-glaze" : "bg-rule"}`}
          />
          {status.open && status.today.close ? (
            <>
              <span className="text-ink">Open now</span> · until {formatTime(status.today.close)}
            </>
          ) : (
            <>
              <span className="text-ink">Closed now</span> · Today {formatRange(status.today)}
            </>
          )}
        </>
      ) : (
        <span className="invisible">Today</span>
      )}
    </p>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile panel: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const button = buttonRef.current;
    document.documentElement.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button?.focus();
      }
      if (e.key === "Tab" && panel && button) {
        const items = [button, ...panel.querySelectorAll<HTMLElement>("a, button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // From the open panel: close first (which releases the scroll lock), then scroll on the next frame.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
      history.pushState(null, "", `#${id}`);
    });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-500 ${
          open
            ? "bg-paper-deep shadow-[0_1px_0_var(--color-rule)]"
            : scrolled
              ? "bg-paper/95 shadow-[0_1px_0_var(--color-rule)] backdrop-blur-[2px]"
              : "bg-transparent"
        }`}
      >
        <a
          href="#main"
          className="label absolute left-4 top-3 z-50 -translate-y-24 bg-ink px-3 py-2 text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="mx-auto flex h-16 max-w-[1680px] items-center justify-between gap-6 px-4 sm:px-6 md:h-[4.5rem] lg:px-10">
          <Link
            href="/"
            className="relative z-50 -my-2 py-2 text-[1.7rem] md:text-[1.9rem]"
            onClick={() => setOpen(false)}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-baseline gap-7 lg:gap-10">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`/#${item.id}`} className="group flex items-baseline gap-1.5 py-2 text-[0.95rem]">
                    <span className="font-display text-[0.8rem] text-copper transition-transform duration-300 group-hover:-translate-y-0.5">
                      {item.numeral}.
                    </span>
                    <span className="link-draw">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <TodayLine className="hidden lg:block" />

          <button
            ref={buttonRef}
            type="button"
            className="relative z-50 -mr-2 flex h-11 items-center gap-2.5 px-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="label">{open ? "Close" : "Index"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* A sibling of <header>, not a child: the header's backdrop-filter would otherwise trap this fixed panel inside it. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 z-30 overflow-y-auto bg-paper-deep pt-16 md:hidden"
      >
        <nav aria-label="Main" className="flex min-h-full flex-col px-4 pb-8 pt-6 sm:px-6">
          <p className="label mb-4 text-ink-soft">Contents</p>
          <ol className="border-t border-rule">
            {nav.map((item, i) => (
              <li key={item.id} className="border-b border-rule" style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={`/#${item.id}`}
                  onClick={(e) => goTo(e, item.id)}
                  className="hero-line flex items-baseline justify-between py-4 font-display text-[2.6rem] leading-none"
                >
                  <span>{item.label}</span>
                  <span className="text-xl text-copper">{item.numeral}.</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-8 space-y-1">
            <TodayLine />
            <p className="text-sm text-ink-soft">{hoursNote}</p>
          </div>
          <p className="mt-auto pt-10 text-xs leading-relaxed text-ink-soft">{conceptNotice}</p>
        </nav>
      </div>
    </>
  );
}
