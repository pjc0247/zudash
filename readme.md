zudash
====

A set of useful methods for TypeScript. <br>

Property Categorizing
----

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

__Custom Categories__
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

PubSub
----

```ts
@subscriber
class Foo {
    @subscribe('greeting')
    on_greeting() {
        console.log('hello world!');
    }
}
```
```ts
publish('greeting');
```

Timer
----

```ts
@subscriber
class Foo {
    @subscribe('every.5s')
    update() { }
    
    @subscribe('every.1h')
    update2() { }
}
```

Debugging
----

__trace__
```ts
class Foo {
    @trace()
    queryUser(id: string, name: string) {
        // ....
    }
}
```

__repl__<br>
Start __REPL__ on method call.
```ts
class Foo {
    @repl()
    queryUser() {
        // ...
    }
}
```

Ideation Stage
----

__Event__

```ts
@consumer()
class Logger {
    // will be executed every 15s,
    // or 10+ events at event buffer.
    @consume('exception_log', 10, '15s')
    sendLogsBatch() {
        /* .... */
    }
}
```
```ts
produce('exception_log', e);
```
