/* eslint-disable @typescript-eslint/no-explicit-any */
import RedisSMQ from "rsmq";
export const rsmq = new RedisSMQ({ host: "127.0.0.1", port: 6379, ns: "rsmq" });

const createJobQueue = (qname: string): Promise<boolean> => {
  return new Promise((res) => {
    rsmq.createQueue({ qname }, (err, resp) => {
      if (err) {
        console.error(err);
        return;
      }
      if (resp === 1) {
        res(true);
      }
    });
  });
};
const checkJobQueue = (qname: string): Promise<RedisSMQ.QueueAttributes> => {
  return new Promise((res) => {
    rsmq.getQueueAttributes({ qname }, (err, resp) => {
      if (err) {
        return res(null);
      }
      if (resp.created) {
        return res(resp);
      } else {
        return res(null);
      }
    });
  });
};

const getJobQueue = async (
  qname: string
): Promise<RedisSMQ.QueueAttributes> => {
  try {
    let queue = await checkJobQueue(qname);
    if (!queue) {
      await createJobQueue(qname);
    }
    queue = await checkJobQueue(qname);
    return queue;
  } catch (error) {
    await createJobQueue(qname);
  }
};

export class JobQueue {
  queueName: string;

  queue: RedisSMQ.QueueAttributes;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  async init(): Promise<void> {
    this.queue = await getJobQueue(this.queueName);
  }

  sendMsg(message: string): Promise<string> {
    return new Promise((res) => {
      rsmq.sendMessage(
        { qname: this.queueName, message },
        function (err, resp) {
          if (err) {
            console.error(err);
            return;
          }

          res(resp);
        }
      );
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  popMsg(): Promise<string> {
    return new Promise((res, rej) => {
      rsmq.popMessage(
        { qname: this.queueName },
        (err: any, resp: RedisSMQ.QueueMessage) => {
          if (err) {
            rej(err);
          }
          res(resp?.message);
        }
      );
    });
  }
}
