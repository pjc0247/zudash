import * as repl from 'repl';
import * as readlineSync from 'readline-sync';

function get_args(func) {  
  return (func + '')
    .replace(/[/][/].*$/mg,'') // strip single-line comments
    .replace(/\s+/g, '') // strip white space
    .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
    .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
    .replace(/=[^,]+/g, '') // strip any ES6 defaults  
    .split(',').filter(Boolean); // split & filter [""]
}

function trace_call(func, names, values) {
  let args = [];
  for (let i=0;i<names.length;i++) {
    args.push(`${names[i]}: ${values[i]}`);
  }
  console.log(`${func} (${args.join(', ')})`);
}
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

export function trace() {
  return function(cls: any, method: any, desc: PropertyDescriptor) {
    const m = desc.value;
    const names = get_args(desc.value);
    desc.value = async function (...args: any[]) {
      trace_call(m.name, names, args);
      return m.apply(this, args);
    };
  };
}
export function breakpoint() {
  return function(cls: any, method: any, desc: PropertyDescriptor) {
    const m = desc.value;
    const names = get_args(desc.value);
    desc.value = async function (...args: any[]) {
      trace_call(m.name, names, args);
      start_repl(this);
      return m.apply(this, args);
    };
  };
}