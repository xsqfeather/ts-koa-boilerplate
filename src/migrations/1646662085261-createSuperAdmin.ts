import { MigrationMethods } from "../lib/types";

export default function createSuperAdmin(): MigrationMethods {
  return {
    up: async (): Promise<void> => {
      console.log("createSUperAdmin");

      return;
    },
    down: async (): Promise<void> => {
      return;
    },
  };
}
