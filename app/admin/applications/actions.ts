"use server";

import { Application, ApplicationStatus } from "@/lib/db/applications";
import { ServerActionResponse } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { applicationFormSchema } from "./ApplicationFormSchema";

export const fetchApplicationsAction = async () => {
  const supabase = await createClient();

  const { data } = await supabase.from("applications").select();

  return data;
};

export const createApplicationAction = async (application: Application) => {
  const supabase = await createClient();

  const result = applicationFormSchema.safeParse(application);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { error } = await supabase
    .from("applications")
    .insert({ ...application });
  if (error) {
    return { error: error.message };
  } else {
    revalidatePath("/admin/applications");
  }
};

export const updateApplicationAction = async (
  id: number,
  application: Application
) => {
  const supabase = await createClient();

  const result = applicationFormSchema.safeParse(application);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { error } = await supabase
    .from("applications")
    .update({ ...application })
    .eq("id", id);
  if (error) {
    return { error: error.message };
  } else {
    revalidatePath("/admin/applications");
  }
};

export const deleteApplicationAction = async (
  id: number
): Promise<ServerActionResponse> => {
  const supabase = await createClient();

  const { error } = await supabase.from("applications").delete().eq("id", id);
  if (error) {
    return { error: error.message };
  } else {
    revalidatePath("/admin/applications");
  }
};

export const toggleApplicationStatusAction = async (
  id: number,
  status: ApplicationStatus
): Promise<ServerActionResponse> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("applications")
    .update({ status: status })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  } else {
    revalidatePath("/admin/applications");
  }
};
