# noodle

13kjs game made for fun

### Useful things

Use this to compile the game with parcel, and then zip it up. If you see the size go over 100% we
are in trouble 😭

```
npm run build
```

You can start the development server via the `start` command. Point to `localhost:7227` for a good
time.

```
npm start
```

### Tests

All of our tests use [QUnit](https://qunitjs.com/).

After running `npm start` you can go to https://localhost:7227/tests.html to run the tests.

Look in the `src/js/tests/` directory to find the tests. The `src/js/tests/main.js` is the entry
point for all of our test modules.
