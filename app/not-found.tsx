import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-semibold bg-gradient-to-r from-[#00f0ff] to-[#b829ff] bg-clip-text text-transparent">
        404
      </h1>
      <p className="text-lg text-muted-foreground">Page not found</p>
      <Link
        href="/home"
        className="text-sm text-[#00f0ff] hover:text-[#33f3ff] underline"
      >
        Go back home
      </Link>
    </div>
  );
}
