"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { applicationSchema } from "../ApplicationSchema";
import { createApplicationAction, updateApplicationAction } from "../actions";
import { Application } from "@/lib/db/applications";
import { isActionError } from "@/lib/utils";
import { toast } from "sonner";

type ApplicationFormProps = {
  closeSheet: () => void;
  application?: Application;
};

export default function ApplicationForm(props: ApplicationFormProps) {
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof applicationSchema>>({
    mode: "onBlur",
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: props.application?.name ?? "",
      identifier: props.application?.identifier ?? "",
      status: props.application?.status ?? "active",
      use_multi_query: props.application?.use_multi_query ?? false,
    },
  });

  function onApplicationNameChanged(value: string) {
    if (value) {
      const newIdentifier = `${value.toLowerCase().replace(/\s/g, "-")}_docs`;
      form.setValue("identifier", newIdentifier);
    } else {
      form.setValue("identifier", "");
    }
  }

  async function onSubmit(values: z.infer<typeof applicationSchema>) {
    if (props.application) {
      const result = await updateApplicationAction(
        props.application.id,
        values as Application
      );
      if (isActionError(result)) {
        setError(result.error);
      } else {
        setError("");
        toast("Application updated successfully");
        props.closeSheet();
      }
    } else {
      const result = await createApplicationAction(values as Application);
      if (isActionError(result)) {
        setError(result.error);
      } else {
        setError("");
        toast("Application created successfully");
        props.closeSheet();
      }
    }
  }

  return (
    <div>
      {error && <div className="text-red-800 my-2">{error}</div>}
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl className="flex flex-col w-full gap-2">
                    <Input
                      placeholder="My app"
                      {...field}
                      onChangeCapture={(e) =>
                        onApplicationNameChanged(e.currentTarget.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  {form.getValues("identifier") && (
                    <div className="mt-2">
                      Identifier: {form.getValues("identifier")}
                    </div>
                  )}
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="use_multi_query"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Use Multi query</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
