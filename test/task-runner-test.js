
import { expect } from 'chai';

import { default as createTaskRunner, sleep } from '../src/task-runner.js';

const tasks = {};

const createTask = (num) => {
  const id = num;
  tasks[id] = 'CREATED';

  return () => {
    return new Promise((resolve) => {
      tasks[id] = 'DISPATCHED';
      sleep(10);
      tasks[id] = 'END';
      resolve(id);
    });
  };
};

describe('TaskRunner', () => {
  const t1 = createTask(1);
  const t2 = createTask(2);
  const t3 = createTask(3);

  before((done) => {
    const runner = createTaskRunner(() => {
      done();
    });
    runner.start();
    runner.push(t1);
    runner.push(t2);
    runner.push(t3);
    runner.stop();
  });

  it('runs all the tasks and stops', () => {
    for (let id in tasks) {
      const state = tasks[id];
      expect(state).to.be.equal('END');
    }
  });
});

