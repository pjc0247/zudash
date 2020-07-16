import { register, getPropertyDecoraters } from './reflection';

export const EDITABLE_METADATA_KEY = Symbol('editable');

export function editable() {
  return category(EDITABLE_METADATA_KEY);
}
export function category(categoryName: string | Symbol) {
  return function(cls: any, property: string) {
    register(cls.constructor.name, property, categoryName);
  };
}

type UpdateOptions = {

};
export function update(obj: any, values: Record<string, any>, opts?: UpdateOptions) {
  if (!values) return;

  Object.getOwnPropertyNames(values).forEach((key) => {
    const categories = getPropertyDecoraters(obj.constructor.name, key);
    if (categories.includes(EDITABLE_METADATA_KEY))
      obj[key] = values[key];
  });
}

type PickOptions = {

};
export function pick(obj: any, category: string, opts?: PickOptions) {
  const picked = {} as any;
  Object.getOwnPropertyNames(obj).forEach((key) => {
    const categories = getPropertyDecoraters(obj.constructor.name, key);
    if (categories.includes(category))
      picked[key] = obj[key];
  });
  return picked;
}

type ExcludeOptions = {

};
export function exclude(obj: any, category: string, opts?: ExcludeOptions) {
  const picked = {} as any;
  Object.getOwnPropertyNames(obj).forEach((key) => {
    const categories = getPropertyDecoraters(obj.constructor.name, key);
    if (!categories.includes(category))
      picked[key] = obj[key];
  });
  return picked;
}
