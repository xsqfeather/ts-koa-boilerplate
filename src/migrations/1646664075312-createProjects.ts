import { MigrationMethods } from "../lib/types";

export default function createProjects(): MigrationMethods {
  return {
    up: async (): Promise<void> => {
      console.log("CreateProjects");
      return;
    },
    down: async (): Promise<void> => {
      return;
    },
  };
}
