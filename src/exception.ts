export function suppress_error(silent = true) {
  return (_this: any, name: string, description: PropertyDescriptor) => {
    const original = description.value;
    description.value = (...args: any) => {
      try {
        original(...args);
      } catch (e) {
        if (!silent) console.error(e);
      }
    };
  };
}