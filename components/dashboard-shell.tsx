import type React from "react"
import { UserNav } from "@/components/user-nav"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="hidden items-center space-x-2 md:flex">
              <span className="hidden font-bold sm:inline-block">Store Rating Platform</span>
            </a>
          </div>
          <UserNav />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
