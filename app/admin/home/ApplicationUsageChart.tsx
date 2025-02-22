"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";

export default function ApplicationUsageChart() {
  const data = [
    { name: "January", desktop: 186, mobile: 80 },
    { name: "February", desktop: 305, mobile: 200 },
    { name: "March", desktop: 237, mobile: 120 },
    { name: "April", desktop: 73, mobile: 190 },
    { name: "May", desktop: 209, mobile: 130 },
    { name: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#8884d8",
    },
    mobile: {
      label: "Mobile",
      color: "#82ca9d",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 50,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis width={30} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="desktop"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="mobile" stroke="#82ca9d" />
      </LineChart>
    </ChartContainer>
  );
}
