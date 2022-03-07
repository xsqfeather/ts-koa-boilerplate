import _ from "lodash";
import * as seeders from "../migrations";
export async function runMigration(): Promise<void> {
  console.log({ seeders });
  console.log(_.values(seeders));

  for (let index = 0; index < _.values(seeders).length; index++) {
    const element = _.values(seeders)[index];
    console.log({ element });
    console.log(element.default.name);
    const { up, down } = element.default();
    console.log({ up, down });
    await up();
  }
}
