import { MigrationMethods } from "../lib/types";

export default function CreateProject(): MigrationMethods {
  return {
    up: async (): Promise<void> => {
      return;
    },
    down: async (): Promise<void> => {
      return;
    },
  };
}
