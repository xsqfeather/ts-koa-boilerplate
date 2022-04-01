import { Service } from "typedi";
import { Task } from "../entities/Task";
import { OnEvent } from "../lib/decorators/OnEvent";
import { BaseEventEmitter } from "../lib/events/BaseEventEmitter";

@Service()
export class TaskEmitter extends BaseEventEmitter<Task> {
  @OnEvent("AfterCreateOneTask")
  afterCreateOneHandler(videoCollector: Task): Task {
    return videoCollector;
  }

  @OnEvent("AfterUpdateOneTask")
  afterUpdateOneHandler(): void {
    return;
  }
}
