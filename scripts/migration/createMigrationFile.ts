export default function createMigrationFile(migrationName: string): string {
  return `
    import { MigrationMethods } from "../lib/types";

    export default function ${migrationName}(): MigrationMethods {
    return {
        up: async (): Promise<void> => {
        return;
        },
        down: async (): Promise<void> => {
        return;
        },
    };
    }
`;
}
