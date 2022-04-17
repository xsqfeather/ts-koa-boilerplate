/* eslint-disable @typescript-eslint/no-explicit-any */
import Emittery from "emittery";
export const emitter: Emittery = new Emittery();

export const OnEvent = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ((
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void) => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    propertyKey: string
  ): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    emitter.on(
      eventName as unknown as string,
      target[propertyKey].bind(target)
    );
  };
};
