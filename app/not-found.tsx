import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-semibold bg-gradient-to-r from-violet-900 to-violet-600 bg-clip-text text-transparent">
        404
      </h1>
      <p className="text-lg text-muted-foreground">Page not found</p>
      <Link
        href="/home"
        className="text-sm text-violet-600 hover:text-violet-900 underline"
      >
        Go back home
      </Link>
    </div>
  );
}
