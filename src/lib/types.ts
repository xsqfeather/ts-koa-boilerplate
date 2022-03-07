export interface MigrationMethods {
  up: () => Promise<void>;
  down: () => Promise<void>;
}
