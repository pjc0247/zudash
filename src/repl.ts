import * as repl from 'repl';
import * as readlineSync from 'readline-sync';

function start_repl(_this) {
  repl.start('> ').context._this = _this;

  /*
  while (true) {
    const line = readlineSync.question('>>');
    console.log(line);
    console.log(line);
    if (line === 'quit' || line === 'exit') break;

    try {
      console.log(eval(line));
    } catch (e) {
      console.error(e);
    }
  }
  */
}

export function breakpoint() {
  return function(cls: any, method: any, desc: PropertyDescriptor) {
    const m = desc.value;
    desc.value = async function (...args: any[]) {
      start_repl(this);
      return m.apply(this, args);
    };
  }
}