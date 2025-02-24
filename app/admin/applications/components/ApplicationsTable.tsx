import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApplicationTableRow } from "./ApplicationTableRow";
import { Application } from "@/lib/db/applications";

export default async function ApplicationsTable(props: {
  applications: Application[];
}) {
  return (
    <Card>
      <CardContent>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Identifier</TableHead>
              <TableHead className="hidden md:table-cell">
                Use multi query
              </TableHead>
              <TableHead className="hidden md:table-cell">API key</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.applications.map((product) => (
              <ApplicationTableRow key={product.id} application={product} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
