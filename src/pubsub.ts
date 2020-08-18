const all_topics: Record<string, boolean> = {};
const subscribers: Record<string, Array<any>> = {};

export function subscriber(target: any) {
  const newType: any = function (...args: any) {
    return new target(...args);
  }
  newType.prototype = target.prototype;
  return newType;
}
export function subscribe(topic: string) {
  all_topics[topic] = true;
  return function(cls: any, method: any, desc: PropertyDescriptor) {
    if (!subscribers[topic]) {
      subscribers[topic] = [];
    }
  };
}

export function unsubscribe(obj: any) {

}
export function publish(topic: string, ...args: any[]) {

}

export function get_all_topics() {
  return Object.keys(all_topics);
}
export function get_all_subtopics(prefix: string) {
  // fixme
  return Object.keys(all_topics)
    .filter(x => x.startsWith(prefix + '.'))
    .map(x => x.substr(prefix.length + 1));
}
export function has_topic(topic: string) {
  return !!all_topics[topic];
}