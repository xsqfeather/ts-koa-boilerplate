import { emitter } from "../decorators/OnEvent";

export class BaseEventEmitter<T> {
  emit(eventName: string, payload: T | null | undefined): void {
    if (typeof eventName === "string") {
      emitter.emit(eventName, payload);
    }
  }
}
