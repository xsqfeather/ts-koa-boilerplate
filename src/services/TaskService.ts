import { Service } from "typedi";
import { Task } from "../entities/Task";
import CurdService from "../lib/services/CurdService";

@Service()
export default class TaskService extends CurdService<Task> {
  constructor() {
    super(Task);
  }
}
