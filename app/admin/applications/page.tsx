import ApplicationsTable from "./components/ApplicationsTable";
import { fetchApplicationsAction } from "./actions";
import { ApplicationFormSheet } from "./components/ApplicationFormSheet";
import { Button } from "@/components/ui/button";

export default async function ApplicationsPage() {
  const data = await fetchApplicationsAction();

  return (
    <div>
      <div className="flex justify-end items-center mb-2">
        <ApplicationFormSheet
          title="Create Application"
          trigger={<Button>Add new</Button>}
        />
      </div>
      {data && <ApplicationsTable applications={data}></ApplicationsTable>}
    </div>
  );
}
