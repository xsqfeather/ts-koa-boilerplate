import { writeFileSync } from "fs";
import path from "path";
import { generateModelCodeText, mapClassProps } from "./templates/model";

import { exec } from "child_process";

import i from "i";
import { generateServiceCodeText } from "./templates/service";
import { generateDtoText, mapRuleClassProps } from "./templates/dto";
import { generateControllerCodeText } from "./templates/controller";

const argvList = process.argv;

if (!argvList.includes("-name")) {
  throw "Please give '-name' argv ";
}

if (!argvList.includes("-fields")) {
  throw "Please give '-fields' argv ";
}

let sourceName = "";

const keyIndexes: number[] = [];
for (const argv of argvList) {
  if (argv.startsWith("-")) {
    keyIndexes.push(argvList.indexOf(argv));
  }
}

let fields: string[] = [];

for (let index = 0; index < keyIndexes.length; index++) {
  const keyIndex = keyIndexes[index];
  if (argvList[keyIndex] === "-name") {
    sourceName = argvList[keyIndex + 1];
  }
  if (argvList[keyIndex] === "-fields") {
    fields = argvList.slice(keyIndex + 1, keyIndexes[index + 1]);
  }
}

const inflect = i();

const SourceName = inflect.camelize(sourceName);

const classProps = mapClassProps(fields);
const ruleClassProps = mapRuleClassProps(classProps);

const modelTxt = generateModelCodeText(SourceName, classProps);
const serviceTxt = generateServiceCodeText(SourceName);
const dtoText = generateDtoText(SourceName, ruleClassProps);
const controllerText = generateControllerCodeText(SourceName);

writeFileSync(
  path.resolve(__dirname, `../src/entities/${SourceName}.ts`),
  modelTxt
);

writeFileSync(
  path.resolve(__dirname, `../src/services/${SourceName}Service.ts`),
  serviceTxt
);

const source_name = inflect.underscore(SourceName);
const source_names = inflect.pluralize(source_name);
const smallSourceName = inflect.camelize(SourceName, false);
const sourceNames = inflect.pluralize(smallSourceName);

const eventComments = `/* ${source_names} events for socket and emittery */ \n`;
const listEvent = `export const On${SourceName}sListed = "On${SourceName}sListed";`;
const showEvent = `export const On${SourceName}Showed = "On${SourceName}Showed";`;
const createEvent = `export const On${SourceName}Created = "On${SourceName}Created"; `;
const updateEvent = `export const On${SourceName}Updated = "On${SourceName}Updated";`;
const deleteManyEvent = `export const On${SourceName}sDeleted = "On${SourceName}sDeleted";`;
const deleteOneEvent = `export const On${SourceName}Deleted = "On${SourceName}Deleted"`;

writeFileSync(
  path.resolve(__dirname, `../src/dtos/${sourceNames}.dto.ts`),
  dtoText
);

writeFileSync(
  path.resolve(__dirname, `../src/controllers/${sourceNames}.controller.ts`),
  controllerText
);

writeFileSync(
  path.resolve(__dirname, `../src/constants/events.ts`),
  eventComments +
    listEvent +
    showEvent +
    createEvent +
    updateEvent +
    deleteManyEvent +
    deleteOneEvent,
  { flag: "a" }
);

exec("yarn lint --fix", () => {
  console.log("=================files below created===================");
  console.log(path.resolve(__dirname, `../src/models/${SourceName}.ts`));
  console.log(
    path.resolve(__dirname, `../src/services/${SourceName}Service.ts`)
  );
  console.log(path.resolve(__dirname, `../src/dtos/${sourceNames}.dto.ts`));
  console.log(
    path.resolve(__dirname, `../src/controllers/${sourceNames}.controller.ts`)
  );
  console.log("updated", path.resolve(__dirname, `../src/constants/events.ts`));
  process.exit();
});
