import 'reflect-metatadata';

export const EDITABLE_METADATA_KEY = Symbol('editable');

export function editable = (): PropertyDecorator {
    return (target, propertyKey) => {
        const editableStore = Reflect.getOwnMetadata(EDITABLE_METADATA_KEY, target) || new Map();
        const propertyValue = Reflect.get(target, propertyKey);
        // editableStore.set(propertyValue);

        Reflect.defineMetadata(EDITABLE_METADATA_KEY, );
    };
}

class Person {
    @editable()
    @category('asdf')
    public name: string;
}

const categoryMetadataKey = Symbol("category");

const p = new Person();
p.name = 'asdf';

function editable() {
    return category('__editable');
}
function category(categoryName: string) {
    return Reflect.metadata(categoryMetadataKey, categoryName);
}
console.log(Reflect.enumerate(p));
// What are you doing right now

_.updateProperties = function(properties: any) {
    const keys = _.pickByCategory('__editable');
};
_.pickByCategory = function(categoryName: string) {
    
};