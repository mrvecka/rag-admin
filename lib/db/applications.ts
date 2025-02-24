export const AvailableApplicationStatuses = [
  "active",
  "disabled",
  "testing",
] as const;

export type ApplicationStatus = (typeof AvailableApplicationStatuses)[number];

export type Application = {
  id: number;
  name: string;
  status: ApplicationStatus;
  identifier: string;
  api_key: string;
  use_multi_query: boolean;
};
