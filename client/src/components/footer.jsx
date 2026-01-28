export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2026 LearnFull. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:underline">
            Privacy
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:underline">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
