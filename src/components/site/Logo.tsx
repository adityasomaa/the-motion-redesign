import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Motion The Agency, home" className={cn("inline-flex shrink-0 items-center", className)}>
      <img src="/brand/motion-logo.png" alt="" width={1059} height={208} className="h-7 w-auto sm:h-8" />
    </Link>
  );
}
