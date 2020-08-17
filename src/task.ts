const flow_data: Record<string, Array<any>> = {};

export enum FlowType {
  OneAtOnce = 'one_at_once',  // one by one
  Ignore = 'ignore',          // ignore trailing calls. method call won't be executed
  Error = 'error',            // throw an exception on trailing calls
};
export function flow(type: FlowType = FlowType.OneAtOnce) {
  const flush_pending_tasks = (key: string) => {
    const pending_tasks = flow_data[key];
    if (pending_tasks && pending_tasks.length) {
      pending_tasks[0]();
      flow_data[key].shift();
    }
  };
  const trailing_call_handler = {
    [FlowType.OneAtOnce]: async (key: string, method: any, ...args: any[]) => {
      return await (new Promise((resolve, reject) => {
        flow_data[key].push(async () => {
          resolve(await method(...args));
        });
      }));
    },
    [FlowType.Ignore]: (key: string, method: any, ...args: any[]) => {
      return null;
    },
    [FlowType.Error]: (key: string, method: any, ...args: any[]) => {
      throw new Error('Multiple call not permitted on method: ' + key);
    },
  }[type];

  return function(cls: any, method: any, desc: PropertyDescriptor) {
    const m = desc.value;
    const key = `${cls}::${method}`;
    desc.value = async (...args: any[]) => {
      try {
        const pending_tasks = flow_data[key];
        if (pending_tasks && pending_tasks.length) {
          return await trailing_call_handler(key, m, ...args);
        } else if (!pending_tasks) {
          flow_data[key] = [null];
        }
        
        return await m(...args);
      } finally {
        flow_data[key].shift();
        flush_pending_tasks(key);
      }
    };
  };
}