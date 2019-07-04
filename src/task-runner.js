
import EventEmitter from 'events';

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const SLEEPMS = 1000;
const RUNNING = 'RUNNING';
const STOP = 'STOP';

class TaskRunner extends EventEmitter {

  constructor() {
    super();
    this.queue = [];
    this.state = STOP;
  }  

  stop() {
    this.state = STOP;
  }

  start() {
    this.state = RUNNING;
    this.runTasks();
  }

  /*
   * task should be a callable function
   */
  push(task) {
    this.queue.push(task);
  }

  async runTasks() {
    console.log('TaskRunner Started');
    while (true) {
      let task = this.queue.shift();

      if (task) {
        await task().catch((e) => console.log(e));
      }
      if (this.state === STOP && this.queue.length === 0) {
        console.log('TaskRunner Stopped');
        return;
      }
      if (this.queue.length === 0) {
        console.log('TaskRunner Sleeping ' + SLEEPMS + ' ms...');
        await sleep(SLEEPMS);
      }
    }
  }
}

const createTaskRunner = () => {
  const taskRunner = new TaskRunner();

  return {
    start: () => {
      taskRunner.start();
    },

    stop: () => {
      taskRunner.stop();
    },

    /*
     * task should be a callable function
     */
    push: (task) => {
      taskRunner.push(task);
    }
  };
}

export default createTaskRunner;

