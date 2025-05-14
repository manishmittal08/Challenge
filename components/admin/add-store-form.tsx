"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const storeSchema = z.object({
  name: z
    .string()
    .min(3, "Store name must be at least 3 characters")
    .max(100, "Store name must not exceed 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(400, "Address must not exceed 400 characters"),
  ownerName: z
    .string()
    .min(20, "Owner name must be at least 20 characters")
    .max(60, "Owner name must not exceed 60 characters"),
  ownerEmail: z.string().email("Please enter a valid email address"),
  ownerPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not exceed 16 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})

export function AddStoreForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      ownerName: "",
      ownerEmail: "",
      ownerPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof storeSchema>) {
    setIsLoading(true)

    try {
      // In a real application, call your API to create the store
      const response = await fetch("/api/admin/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create store")
      }

      toast({
        title: "Store created",
        description: "The store has been successfully created with an owner account.",
      })

      form.reset()
    } catch (error) {
      console.error("Store creation error:", error)
      toast({
        title: "Creation failed",
        description: error instanceof Error ? error.message : "There was an error creating the store",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4 rounded-md border p-4">
          <h3 className="text-lg font-medium">Store Information</h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter store name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Email</FormLabel>
                <FormControl>
                  <Input placeholder="store@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter store address (max 400 characters)" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 rounded-md border p-4">
          <h3 className="text-lg font-medium">Store Owner Information</h3>
          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter owner's full name (20-60 characters)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Email</FormLabel>
                <FormControl>
                  <Input placeholder="owner@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="8-16 chars with uppercase & special char" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Store"}
        </Button>
      </form>
    </Form>
  )
}
