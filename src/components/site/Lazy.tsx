"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mounts heavy children (WebGL, canvas) only once they get close to the viewport. */
export default function LazyMount({
  children,
  placeholder = null,
  className,
  rootMargin = "600px 0px",
}: {
  children: ReactNode;
  placeholder?: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return (
    <div ref={ref} className={className}>
      {show ? children : placeholder}
    </div>
  );
}
