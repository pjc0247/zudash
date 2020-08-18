import { flow, FlowType } from './src/task';
import { subscriber, subscribe } from './src/pubsub';
import { breakpoint, trace } from './src/debug';

// @ts-ignore
require('./src/timer');

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
  @trace()
  async foo(a: number, b: string) {
    console.log(this);
    console.log("1");
    await delay(1000);
    console.log("2");
  }

  @subscribe('every.4s')
  bb() {
    console.log('Bo');
  }
}

const t = new Task();
t.foo(1, 'b');
