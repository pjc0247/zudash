import { flow, FlowType } from './src/task';
import { subscriber, subscribe } from './src/pubsub';

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

@subscriber
class Task {
  @flow(FlowType.Ignore)
  async foo() {
    console.log("1");
    await delay(1000);
    console.log("2");
  }

  @subscribe('apple')
  bb() {
    console.log('Bo');
  }
}

const t = new Task();
t.foo();
t.foo();
t.foo();
t.foo();