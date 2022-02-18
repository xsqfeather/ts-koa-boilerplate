import Emittery from "emittery";
const emitter = new Emittery();

export default function OnEvent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    propertyKey: string
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emitter.on(eventName as unknown as string, (target as any)[propertyKey]);
  };
}
