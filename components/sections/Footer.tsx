export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} White B0x. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-neutral-500 hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-sm text-neutral-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
