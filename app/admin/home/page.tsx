import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import ApplicationUsageChart from "./ApplicationUsageChart";

export default async function HomePage() {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle># running applications</CardTitle>
          </CardHeader>
          <CardContent className="grow">
            You have 3 applications in total. 2 applications are running in PROD
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button asChild>
              <Link href="applications">See applications</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle># available models</CardTitle>
          </CardHeader>
          <CardContent className="grow">
            You have 2 model available in your plan
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href="#">See plans</Link>
            </Button>
            <Button asChild>
              <Link href="models">See models</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle># avg inference time</CardTitle>
          </CardHeader>
          <CardContent className="grow">
            Average inference time is less than 1s for production applications.
            For testing applications it might be slower.
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardContent>
            <ApplicationUsageChart />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
