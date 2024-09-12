"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader, Loader2, LoaderCircle } from "lucide-react";

export default function FormComp() {
  const FormSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must be less than 128 characters long")
      .nonempty("Password is required"),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Recieved",
          description: (
            <pre className="mt-2 w-[auto] rounded-md bg-red-950 p-4">
              <code className="text-white p-4">{result.message}</code>
            </pre>
          ),
        });
        setLoading(false);
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-950 p-4">
              <code className="text-white">
                {JSON.stringify(errorData, null, 2)}
              </code>
            </pre>
          ),
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
      });
    }
    setLoading(false);
  }
  return (
    <div className="absolute w-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border p-4 rounded">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <h1 className="text-xl">Form</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" className="flex gap-2">
            <span>submit</span>
            {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
