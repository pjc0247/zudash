import { flow, FlowType } from './src/task';

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

class Task {
  @flow(FlowType.Ignore)
  async foo() {
    console.log("1");
    await delay(1000);
    console.log("2");
  }
}

const t = new Task();
t.foo();
t.foo();
t.foo();
t.foo();