export type Application = {
  id: number;
  name: string;
  status: "active" | "disabled";
  identifier: string;
  use_multi_query: boolean;
};
