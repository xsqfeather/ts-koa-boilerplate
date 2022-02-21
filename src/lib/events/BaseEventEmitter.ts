import Emittery from "emittery";

export const emitter = new Emittery();

export class BaseEventEmitter<T> {
  emit(eventName: string, payload: T | null | undefined): void {
    if (typeof eventName === "string") {
      emitter.emit(eventName, payload);
    }
  }
}
