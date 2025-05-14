import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">Store Rating Platform</h1>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Rate Your Favorite Stores
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Join our platform to discover and rate stores. Share your experiences and help others make informed
                  decisions.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href="/stores">
                    <Button size="lg" variant="outline">
                      Browse Stores
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 lg:flex-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Features</CardTitle>
                    <CardDescription>What you can do on our platform</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <p className="font-medium leading-none">Rate Stores</p>
                        <p className="text-sm text-muted-foreground">
                          Submit ratings from 1 to 5 for any registered store
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <p className="font-medium leading-none">Discover New Places</p>
                        <p className="text-sm text-muted-foreground">
                          Browse and search for stores by name and location
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <p className="font-medium leading-none">Store Owner Dashboard</p>
                        <p className="text-sm text-muted-foreground">
                          For store owners to track ratings and customer feedback
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Join thousands of users rating their favorite stores
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Store Rating Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
