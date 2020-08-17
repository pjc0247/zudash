zudash
====

Categorize your properties. <br>


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

// email won't be updated
_.update(p, {
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
_.pick('inventory');
/* {
    weapon: 'aa',
    shield: 'bb',
    cape: 'cc'
} */
```

Task
----

```ts
class WriteTask {
    @flow(FlowType.OneAtOnce)
    async do_work() {
        /* some io tasks here */
    }
}
```
```ts
w.do_work();
w.do_work();
w.do_work();
```
