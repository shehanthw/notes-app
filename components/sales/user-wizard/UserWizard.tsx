"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ChevronLeft } from "lucide-react";

// Import Shadcn form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createUser } from "@/app/actions/users";

interface UsersWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

type FieldProps = {
  value: any;              // Current field value
  onChange: (value: any) => void;  // Function to update the value
  onBlur: () => void;      // Function to trigger validation
  name: string;            // Field name
  ref: React.Ref<any>;     // React ref
  disabled?: boolean;      // Whether field is disabled
};

// Define Zod schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function UserWizard({ isOpen, onClose }: UsersWizardProps) {
  const [step, setStep] = useState(1);
  const roles = ["Admin", "Sales", "Delivery", "Collection"];

  // Initialize React Hook Form with Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      phone: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setStep(1);
    }
  }, [isOpen, form]);

  const closeWizard = () => {
    onClose();
    form.reset();
    setStep(1);
  };

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form data:", values);
    await createUser(values);
    form.reset();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={closeWizard} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex flex-col">
        <div className="flex-1 bg-white rounded-t-3xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-4">
            <div className="flex items-center justify-between">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="p-2">
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : (
                <div className="w-10" />
              )}

              <div className="text-center">
                <div className="font-semibold">Add New User</div>
                <div className="text-xs text-gray-500">Step 1 of 1</div>
              </div>

              <button onClick={closeWizard} className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${(step / 1) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input className="py-6" placeholder="Enter user's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input className="py-6" placeholder="Enter email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Field */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Role <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="py-6 w-full">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input className="py-6" placeholder="Enter phone number" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input className="py-6" placeholder="Enter password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Hidden submit button for Enter key support */}
                <button type="submit" className="hidden" />
              </form>
            </Form>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t bg-white p-4">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full py-6 rounded-2xl font-medium border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              variant="outline"
            >
              Add user
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}