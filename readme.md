zudash
====

Categorize your properties. <br>
(Concept only repository)


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

// email should not be updated
_.updateProperties(p, {
    name: 'zhuzhu',
    email: 'pjc0247@gmail.com'
});
```

Custom Categories
----
```ts
class Person {
    @category('inventory')
    public weapon: string;
    @category('inventory')
    public shield: string;
    @category('inventory')
    public cape: string;

    public name: string;
}
```
```ts
_.get('inventory');
/* {
    weapon: 'aa',
    shield: 'bb',
    cape: 'cc'
} */
```
