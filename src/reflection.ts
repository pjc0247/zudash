const registry = new Map<string, Map<string, (string | Symbol)[]>>();

export function register(cls: string, property: string, decorator: (string | Symbol)) {
  let map: Map<string, (string | Symbol)[]>;

  if (registry.has(cls)) {
    map = registry.get(cls)!;
  } else {
    map = new Map<string, (string | Symbol)[]>();
    registry.set(cls, map);
  }

  let list: (string | Symbol)[];
  if (map.has(property)) {
    list = map.get(property)!;
  } else {
    list = [];
    map.set(property, list);
  }

  if (list.indexOf(decorator) < 0) {
    list.push(decorator);
  }
}
export function getPropertyDecoraters(cls: string, property: string) {
  const klassMeta = registry.get(cls);
  if (!klassMeta) return [];

  const propertyMeta = klassMeta.get(property);
  if (!propertyMeta) return [];

  return propertyMeta;
}
