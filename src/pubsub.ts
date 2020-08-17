const subscribers: Record<string, Array<any>> = {};

export function subscriber(target: any) {
  const newType: any = function (...args: any) {
    console.log("New: " + target.name); 
    return new target(...args);
  }
  newType.prototype = target.prototype;
  return newType;
}
export function subscribe(topic: string) {
  return function(cls: any, method: any, desc: PropertyDescriptor) {
    if (!subscribers[topic]) {
      subscribers[topic] = [];
    }
  };
}

export function publish(topic: string, ...argg: any[]) {
  
}