export function FooterSection() {
  return (
    <footer className="relative border-t border-white/5 bg-[#030508] py-6 px-4 sm:py-8 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-white/30">
          &copy; 2026 white b0x inc. All rights reserved.
        </p>
        <a
          href="https://github.com/white-b0x"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/30 transition-colors hover:text-white/60"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
