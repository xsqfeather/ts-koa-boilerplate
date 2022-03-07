import { MigrationMethods } from "../lib/types";

export default function b_123dsf(): MigrationMethods {
  return {
    up: async () => {
      console.log("b123, up");
    },
    down: async () => {},
  };
}
