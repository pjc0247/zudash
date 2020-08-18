import { publish, get_all_subtopics } from "./pubsub";

function set_timer_publisher(interval, topic) {
  setInterval(() => {
    publish(`every.${topic}`);
  }, interval * 1000);
}
function enable_timer() {
  for (const subtopic of get_all_subtopics('every')) {
    const s = /^([0-9]+)s$/.exec(subtopic);
    if (s && s.length) set_timer_publisher(+s[1], subtopic);

    const m = /^([0-9]+)m$/.exec(subtopic);
    if (m && m.length) set_timer_publisher(+m[1] * 60, subtopic);

    const h = /^([0-9]+)h$/.exec(subtopic);
    if (h && h.length) set_timer_publisher(+h[1] * 3600, subtopic);
  }
}
setTimeout(() => {
  enable_timer();
}, 1);