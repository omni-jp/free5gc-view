# Requirement

* node.js
* Go

# Setup

```
$ git clone github.com/free5gc/free5gc
$ cd free5gc-view
$ ln -s ../free5gc/config .
$ npm install
```

# Build

## frontend

```
$ npm run build
```

## backend

```
$ cd backend
$ go build
```

# Run the server

```
$ npm run dev
```

```
$ ./backend/server .
```

you can access through https://localhost:3000.
