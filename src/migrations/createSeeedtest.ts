import { MigrationMethods } from "../lib/types";

export default function hello(): MigrationMethods {
  return {
    up: async () => {
      console.log("瞎逼逼");
    },
    down: async () => {},
  };
}
