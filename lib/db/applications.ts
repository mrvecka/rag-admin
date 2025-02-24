export type Application = {
  id: number;
  name: string;
  status: "active" | "disabled";
  identifier: string;
  api_key: string;
  use_multi_query: boolean;
};
