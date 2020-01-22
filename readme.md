zudash
====

Categorize your properties.


```ts
class Person {
    @editable()
    public name: string;

    public email: string;
}
```
```ts
let p: Person = {
    name: 'zuzu', email: 'pjc0247@naver.com'
};

_.updateProperties(p, {
    name: 'zhuzhu',
    email: 'pjc0247@gmail.com'
});
```