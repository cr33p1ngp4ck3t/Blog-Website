const e = "react", s = "React is a JavaScript library for building user interfaces.", r = [
  "react"
], t = "19.0.0", c = "https://react.dev/", i = "https://github.com/facebook/react/issues", n = "MIT", a = [
  "LICENSE",
  "README.md",
  "index.js",
  "cjs/",
  "compiler-runtime.js",
  "jsx-runtime.js",
  "jsx-runtime.react-server.js",
  "jsx-dev-runtime.js",
  "jsx-dev-runtime.react-server.js",
  "react.react-server.js"
], o = "index.js", j = {
  ".": {
    "react-server": "./react.react-server.js",
    default: "./index.js"
  },
  "./package.json": "./package.json",
  "./jsx-runtime": {
    "react-server": "./jsx-runtime.react-server.js",
    default: "./jsx-runtime.js"
  },
  "./jsx-dev-runtime": {
    "react-server": "./jsx-dev-runtime.react-server.js",
    default: "./jsx-dev-runtime.js"
  },
  "./compiler-runtime": {
    "react-server": "./compiler-runtime.js",
    default: "./compiler-runtime.js"
  }
}, m = {
  type: "git",
  url: "https://github.com/facebook/react.git",
  directory: "packages/react"
}, u = {
  node: ">=0.10.0"
}, d = {
  name: e,
  description: s,
  keywords: r,
  version: t,
  homepage: c,
  bugs: i,
  license: n,
  files: a,
  main: o,
  exports: j,
  repository: m,
  engines: u
};
export {
  i as bugs,
  d as default,
  s as description,
  u as engines,
  j as exports,
  a as files,
  c as homepage,
  r as keywords,
  n as license,
  o as main,
  e as name,
  m as repository,
  t as version
};
