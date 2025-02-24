"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { applicationFormSchema } from "../ApplicationFormSchema";
import { createApplicationAction, updateApplicationAction } from "../actions";
import {
  Application,
  AvailableApplicationStatuses,
} from "@/lib/db/applications";
import { isActionError } from "@/lib/utils";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";

type ApplicationFormProps = {
  closeSheet: () => void;
  application?: Application;
};

export default function ApplicationForm(props: ApplicationFormProps) {
  const [error, setError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof applicationFormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: props.application?.name ?? "",
      identifier: props.application?.identifier ?? "",
      status: props.application?.status ?? "active",
      use_multi_query: props.application?.use_multi_query ?? false,
    },
  });

  function onApplicationNameChanged(value: string) {
    if (props.application) {
      return;
    }

    if (value) {
      const newIdentifier = `${value.toLowerCase().replace(/\s/g, "_")}_docs`;
      form.setValue("identifier", newIdentifier);
    } else {
      form.setValue("identifier", "");
    }
  }

  async function onSubmit(values: z.infer<typeof applicationFormSchema>) {
    // ToDo: Find a way to get rid of "as Application" cast
    if (props.application) {
      const result = await updateApplicationAction(
        props.application.id,
        values as Application
      );
      if (isActionError(result)) {
        setError(result.error);
      } else {
        setError("");
        formRef.current?.reset();

        props.closeSheet();
        toast("Application updated successfully");
      }
    } else {
      const result = await createApplicationAction(values as Application);
      if (isActionError(result)) {
        setError(result.error);
      } else {
        setError("");
        formRef.current?.reset();

        props.closeSheet();
        toast("Application created successfully");
      }
    }
  }

  return (
    <div>
      {error && <div className="text-red-800 my-2">{error}</div>}
      <Form {...form}>
        <form
          ref={formRef}
          className="space-y-8 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
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
                <div className="text-sm text-gray-500 mt-2">
                  This is just a fancy name of your application where the RAG
                  service will be used. We will use it to generate identifier
                  which will be used to access some part of the service
                  internally.
                </div>
              </FormItem>
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
                    {AvailableApplicationStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        <div className="first-letter:uppercase">{status}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <div className="text-sm text-gray-500 mt-2">
                  In any case you want to stop inference on this application,
                  you can disable it here. Bare in mind that any request will
                  fail. Application will also be disabled during updating
                  context.
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="use_multi_query"
            render={({ field }) => (
              <>
                <FormItem className="flex flex-col ">
                  <div className="space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Use Multi query</FormLabel>
                    <FormMessage />
                  </div>
                  <div className="text-sm text-gray-500">
                    Use multi query is a concept used to retrieve more relevant
                    data for your query. You will get more precise answer but
                    also it will consume some tokens from used LLM. It doesn't
                    apply to local models.
                  </div>
                </FormItem>
              </>
            )}
          />
          <SubmitButton>Submit</SubmitButton>
        </form>
      </Form>
    </div>
  );
}
