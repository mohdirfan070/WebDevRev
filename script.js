const T=(s,t,e,c,k)=>({s,t,e,c,k});
const DATA=[
// ---------- JAVASCRIPT ----------
T('js','Hoisting','JS moves declarations to the top before running. var = undefined until assigned. Function declarations work fully early. let/const exist but sit in the "temporal dead zone" (error if used early).',
`sayHi();          // works
console.log(a);   // undefined
var a = 3;
function sayHi(){ console.log('Hi'); }
console.log(b);   // ReferenceError
let b = 1;`,'Function expressions and arrow functions are NOT hoisted like declarations.'),
T('js','Execution Context','The box where code runs. Phase 1 (memory): variables/functions are stored. Phase 2 (execution): code runs line by line. Every function call gets a new context pushed on the Call Stack and popped when it returns.',
`console.log('Hii');
let a = 3;
demo();            // new context on stack
console.log('Bye');`,'Global context is created first, always.'),
T('js','Closures','A function remembers the variables of the place where it was created, even after the outer function has finished. Each call to the outer function makes a fresh, private copy.',
`function parentFunc(person){
  let money = 500;
  return () => {
    if(money==0) console.log('No money left');
    else { money -= 100; console.log(person+' has '+money); }
  };
}
const son1 = parentFunc('Beta1');
const son2 = parentFunc('Beta2');
son1(); son1();   // 400, 300 (son2 has its own money)`,'Uses: data privacy, counters, setTimeout inside loops.'),
T('js','var vs let vs const','var: function-scoped, hoisted as undefined. let: block-scoped, reassignable. const: block-scoped, cannot be reassigned (object contents can still change). Inner block can shadow an outer variable.',
`let x = 'Outer';
if (true) { let x = 'Inner'; console.log(x); } // Inner
console.log(x);                                // Outer
let n = null;  // empty on purpose
let u;         // undefined (not assigned)`,'Default to const, use let when you must reassign, avoid var.'),
T('js','Types of Functions','Declaration (hoisted), Expression (stored in variable, not hoisted), Anonymous (no name), Named expression (name only visible inside), Arrow (short, no own this), IIFE (runs instantly), Generator (pause with yield), Async (returns a Promise), Constructor (use with new).',
`function greet(){}                     // declaration
const g = function(){};                // expression
const a = () => console.log('hi');     // arrow
(function(){ console.log('IIFE'); })();
function* gen(){ yield 'Hello'; yield 'World'; }
const it = gen(); it.next().value;     // Hello
async function load(){ const r = await fetch(url); }
function Person(n){ this.name = n; }
const p = new Person('Alice');`,'Parameters = names in definition. Arguments = values you pass.'),
T('js','First-class & Higher-Order Functions','First-class: functions can be stored in variables, passed as arguments and returned. Higher-order function: takes a function as input or returns one (map, filter, setTimeout).',
`function applyOperation(op, a, b){ return op(a, b); }
function sum(x, y){ return x + y; }
applyOperation(sum, 3, 4);   // 7`,'Say: "functions are just values in JavaScript".'),
T('js','Callbacks','A function you hand to another function to be called later (after a task finishes). Code order: start, end, then the callback.',
`setTimeout(() => console.log('From Timer'), 2000);
function y(){ console.log('Y'); }
function x(){ y(); console.log('X'); }
x();   // Y, X, then From Timer after 2s`,'Too many nested callbacks = "callback hell". Promises/async-await fix it.'),
T('js','Event Loop','JS has one call stack. Async work (setTimeout, fetch) goes to Web APIs. When done, its callback waits in a queue. Event loop pushes it to the stack only when the stack is empty. Promise callbacks (microtask queue) always run before timer callbacks (callback queue).',
`console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');
// Start, End, Promise, Timeout`,'Sync code first, then microtasks, then timers.'),
T('js','Array Methods & Freeze','map = transform each item (new array). filter = keep matching items. find = first matching item. forEach = loop, returns nothing. Object.freeze stops changes to an object.',
`let arr = [2,3,4,5];
arr.map(v => v*2);      // [4,6,8,10]
arr.filter(v => v>2);   // [3,4,5]
arr.find(v => v>3);     // 4
Object.freeze(obj);     // no edits allowed`,'map/filter return new arrays, they do not change the original.'),
T('js','Data Types','Primitives: string, number, boolean, null, undefined, symbol, bigint (copied by value). Objects (arrays, functions too) are copied by reference.',
`typeof 'hi';       // string
typeof null;       // object (famous JS bug)
typeof undefined;  // undefined
let a = {x:1}; let b = a; b.x = 9; // a.x is 9 too`,'null = empty on purpose. undefined = no value assigned yet.'),

// ---------- REACT ----------
T('react','React, Virtual DOM & Reconciliation','React is a library for building UIs from small reusable components (like LEGO). The Virtual DOM is a light JS copy of the real DOM. On change React builds a new copy, compares with the old one (diffing) and updates only what changed in the real DOM. That process is reconciliation. Keys help it track list items.',
`<ul>
  <li key="1">Apple</li>
  <li key="2">Banana</li>
</ul>
{/* 100 items, 1 changes: only 1 updates */}`,'Like editing a draft before saving the final document.'),
T('react','React Fiber','The engine since React 16. It splits rendering into small chunks and can pause low-priority work (big list loading) to handle urgent work (button click) first.',
`// Click updates instantly
// while a big list renders in background`,'Fiber = a smart manager who prioritizes tasks.'),
T('react','State & Props','State = data a component owns and can change (changing it re-renders UI). Props = data passed from parent to child, read-only.',
`function Greeting({ name }){ return <h1>Hello, {name}!</h1>; }
function App(){ return <Greeting name="Alice" />; }`,'State = component memory. Props = instructions from the parent.'),
T('react','Props Drilling vs Context','Props drilling: passing props through many layers just to reach a deep child. Okay for small apps, messy for big ones. Context or Redux shares data without it.',
`<Parent name="Alice"/>      // passes to
function Parent({name}){ return <Child name={name}/>; }
function Child({name}){ return <h1>{name}</h1>; }`,'Like passing a note through many people.'),
T('react','useState','Adds state to function components. Returns [value, setter]. Calling the setter re-renders.',
`const [isOn, setIsOn] = useState(false);
<button onClick={() => setIsOn(!isOn)}>
  {isOn ? 'On' : 'Off'}
</button>`,'Like a light switch.'),
T('react','useEffect & Lifecycle','Runs side effects (fetch data, timers) after render. The dependency array controls when: [] = once on mount, [dep] = when dep changes. The returned function is cleanup (unmount).',
`useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json()).then(setData);
  return () => console.log('Cleanup');
}, []);   // mount once`,'Replaces componentDidMount / DidUpdate / WillUnmount.'),
T('react','useRef','Holds a value that survives re-renders without causing one. Most used to grab a DOM element via .current.',
`const inputRef = useRef(null);
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>`,'A sticky note on a DOM element.'),
T('react','useLayoutEffect','Same as useEffect but runs before the browser paints. Use it to measure the DOM (size, position) and adjust before the user sees anything.',
`useLayoutEffect(() => {
  const { height } = divRef.current.getBoundingClientRect();
}, []);`,'Prefer useEffect unless you need to measure.'),
T('react','useReducer','For complex state logic. A reducer function takes (state, action) and returns new state. Dispatch actions to change it. A mini-Redux.',
`function reducer(state, action){
  switch(action.type){
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });`,'A traffic controller for state changes.'),
T('react','useContext','Reads shared data from the nearest Provider, with no props drilling.',
`const ThemeContext = createContext('light');
<ThemeContext.Provider value="dark"><Display/></ThemeContext.Provider>
function Display(){ const theme = useContext(ThemeContext); return <div>{theme}</div>; }`,'A shared bulletin board.'),
T('react','Performance: useMemo, useCallback, memo, lazy','useMemo caches an expensive calculation. useCallback caches a function. React.memo skips re-render if props are unchanged. React.lazy loads big components only when needed. Keys avoid re-rendering unchanged list items.',
`const sum = useMemo(() => nums.reduce((a,b)=>a+b,0), [nums]);
const onClick = useCallback(() => setCount(c => c+1), []);
const Child = memo(({data, onClick}) => <button onClick={onClick}>{data}</button>);`,'Use them for real slowness, not everywhere.'),
T('react','Pros, Cons & Interview Tips','Pros: fast updates, reusable components, huge ecosystem (Next.js, React Native). Cons: hooks take time to learn, needs extra libraries (routing, state), JSX feels strange at first.',
`// Freshers: useState, useEffect, props, Context
// Experienced: useMemo, useCallback, Redux, optimization
// Always explain with analogies + your own project`,'"Powerful and flexible but needs extra tools for big apps."'),

// ---------- REDUX ----------
T('redux','Redux Core Terms','Redux = one central place to manage app-wide (global) state. Store: holds all state. Action: plain object with a type (and payload). Reducer: (state, action) => newState. Slice: reducers + actions of one feature in one file. useSelector reads state, useDispatch sends actions.',
`{ type: 'ADD', payload: 'write code' }   // an action
// reducer: (state, action) => newState`,'Like a central bank: everyone uses the same account.'),
T('redux','Redux Toolkit Setup','1) npm i @reduxjs/toolkit react-redux. 2) Create app/store.js with configureStore. 3) Create a slice file. 4) Add the slice reducer to the store. 5) Wrap <App/> in <Provider store={store}>.',
`// store.js
export const store = configureStore({
  reducer: { counter: counterReducer }
});
// main.jsx
<Provider store={store}><App/></Provider>`,'The key name in reducer ({counter: ...}) is what you use in useSelector.'),
T('redux','createSlice (Counter)','createSlice takes a name, initialState and reducers. Redux Toolkit auto-creates the action creators. Export the actions and the reducer.',
`const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    reset: (state) => { state.value = 0 },
    incrementByAmount: (state, action) => { state.value += action.payload },
  },
});
export const { increment, reset, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;`,'Inside createSlice you may "mutate" state: Immer handles immutability.'),
T('redux','Using Redux in Components','useSelector picks data from the store. useDispatch gives dispatch. Call dispatch with an action creator.',
`const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();
<button onClick={() => dispatch(increment())}>+</button>
<button onClick={() => dispatch(incrementByAmount(Number(n)))}>Add</button>`,'Convert input text to Number before sending it as payload.'),
T('redux','Redux Thunk (API calls)','Thunk is middleware that lets an action creator return a function instead of an object. That function gets dispatch, so you can do async work (API call) and dispatch REQUEST, SUCCESS or FAILURE actions.',
`export const fetchData = () => async (dispatch) => {
  dispatch({ type: 'FETCH_DATA_REQUEST' });
  try {
    const res = await axios.get(url);
    dispatch({ type: 'FETCH_DATA_SUCCESS', payload: res.data });
  } catch (e) {
    dispatch({ type: 'FETCH_DATA_FAILURE', payload: e.message });
  }
};
useEffect(() => { dispatch(fetchData()); }, [dispatch]);`,'Small app? Context or React Query may be enough.'),
T('redux','Todo Slice: Common Mistakes','In a slice, push() works because of Immer. But filter/map return new values, so you must assign them. A map callback must return something.',
`addTodo: (state, action) => { state.todos.push({id: nanoid(), task: action.payload, isDone:false}) },
// Wrong: state.todos.filter(...)   (result thrown away)
deleteTodo: (state, action) => { state.todos = state.todos.filter(t => t.id !== action.payload) },
markAsDone: (state, action) => {
  const t = state.todos.find(t => t.id === action.payload);
  if (t) t.isDone = true;
}`,'nanoid() makes unique ids.'),

// ---------- NODE ----------
T('node','What is Node.js','A JavaScript runtime (made by Ryan Dahl) built on Chrome\'s V8 engine, so JS runs outside the browser. Node is single-threaded for JS but uses an event loop for non-blocking work.',
`// run a file
node app.js
const fs = require('fs');   // built-in module`,'http/https are the protocols used to send and receive data.'),
T('node','File System (fs)','Create, read, update, delete, rename files. Sync versions block and return data. Async versions return nothing and use a callback.',
`const fs = require('fs');
fs.writeFileSync('./abc.txt', 'Hello');      // create (sync)
fs.writeFile('./abc.txt', 'Hello', err => err && console.log(err)); // async
const data = fs.readFileSync('./abc.txt');   // read
fs.appendFileSync('./abc.txt', '\\nMore');    // add to end
fs.renameSync('./a.txt', './b.txt');         // rename
fs.unlinkSync('./b.txt');                    // delete file
fs.statSync('./vid.mp4');                    // file info
fs.mkdir / fs.rmdir                          // folders`,'Prefer async in servers so you do not block other requests.'),
T('node','Threads / CPU Cores','Node runs your JS on one thread, but the machine has many CPU cores. You can check how many, and use them with clusters.',
`const os = require('os');
console.log(os.cpus().length);   // number of cores`,'This number decides how many cluster workers to fork.'),
T('node','Express & Versions','Express is a library for writing servers with clean, simple code. Version 4.18.2 = MAJOR.MINOR.PATCH: 4 = breaking changes, 18 = security/recommended fixes, 2 = small bug fixes.',
`const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('Hello'));
app.listen(8000, () => console.log('Running on 8000'));`,'express.json() reads JSON body, urlencoded() reads form data.'),
T('node','REST API vs SSR','REST API works on client-server architecture and sends data (res.json). SSR renders HTML on the server and sends the finished page (res.render with EJS). Dynamic path parameter: /api/user/:id.',
`app.set('view engine', 'ejs');
app.get('/about', (req, res) => res.render('about'));   // SSR
app.get('/api/user/:id', (req, res) => {
  res.json({ id: req.params.id });                       // REST
});`,'req.params = path values. req.query = ?key=value.'),
T('node','Headers','Part of every request/response. They carry meta-data (info about the request or response body) such as content type, auth token, cookies.',
`app.get('/', (req, res) => {
  console.log(req.headers['headerfromuser']);   // lowercase keys
  res.setHeader('X-Custom', 'hi');
  res.send('Hello');
});`,'Node lowercases all incoming header names.'),
T('node','Authentication: Stateful vs Stateless','Authentication = verifying who the user is. Stateful: server stores a session and sends a session ID (cookie). Easy to invalidate, harder to scale. Stateless: server stores nothing; client gets a token (JWT) and sends it with each request. Scales well, tokens must be short-lived and stored safely.',
`// Stateful: express-session (sid in cookie)
// Stateless: jsonwebtoken
const token = jwt.sign({ id: 1 }, SECRET, { expiresIn: '1h' });
// client sends: Authorization: Bearer <token>
const user = jwt.verify(token, SECRET);`,'Big/distributed/microservices = stateless. Need instant control = stateful.'),
T('node','WebSockets (Socket.IO)','Two-way (bi-directional, full-duplex) communication over one TCP connection, great for chat and live data. Starts as HTTP and upgrades using the Upgrade header. Use Node\'s http module with Express so one server handles both normal requests and sockets.',
`const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  socket.on('sent-message', msg => io.emit('msg-to-all', msg));
});
// client
const socket = io();
socket.emit('sent-message', 'hi');
socket.on('msg-to-all', msg => console.log(msg));`,'emit = send event. on = listen for event. io.emit = to everyone.'),
T('node','Streams','Send a file chunk by chunk instead of loading it fully into RAM. Less server load, lower latency. createReadStream reads, createWriteStream writes, pipe() connects them. Videos use the Range header and status 206.',
`app.get('/video', (req, res) => {
  const stream = fs.createReadStream('./video.mp4');
  stream.pipe(res);          // chunks go straight to client
});
// with Range header: res.writeHead(206, {'Content-Range': ...})`,'readFile loads everything in memory; streams do not.'),
T('node','Clusters','Scale a Node app by creating worker processes (one per CPU core) that share the same port and split the load.',
`const cluster = require('node:cluster');
const os = require('os');
if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) cluster.fork();
} else {
  app.listen(8000);   // each worker runs the server
}
// process.pid shows which worker replied`,'Primary forks workers; workers handle requests.'),
T('node','NGINX','A powerful web server with a non-threaded, event-driven design (handles ~10,000 concurrent requests). Does load balancing, HTTP caching, reverse proxy, API gateway, serves static files and handles SSL.',
`Forward proxy: many clients -> 1 server
  (server doesn't know which clients)
Reverse proxy: many clients -> many servers
  (client doesn't know which server replied)`,'NGINX sits in front of your Node servers.')
];

const SECS={all:'All',js:'JavaScript',react:'React',redux:'Redux',node:'Node.js'};
const $=s=>document.querySelector(s);
let sec='all',q='',done={};
try{done=JSON.parse(localStorage.getItem('rev')||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem('rev',JSON.stringify(done))}catch(e){}};

function mk(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt!=null)n.textContent=txt;return n}

function render(){
  const list=$('#list');list.textContent='';
  const items=DATA.filter(d=>(sec=='all'||d.s==sec)&&(d.t+d.e+d.c).toLowerCase().includes(q));
  items.forEach(d=>{
    const det=mk('details','card '+d.s);
    const sm=mk('summary');
    const cb=mk('input');cb.type='checkbox';cb.checked=!!done[d.t];
    cb.title='Mark as revised';
    cb.onclick=e=>{e.stopPropagation();done[d.t]=cb.checked;save();stats()};
    sm.append(cb,mk('span','tag',SECS[d.s]),mk('span','ttl',d.t));
    const n=(window.NOTES||{})[d.t]||{};
    det.append(sm,mk('h4',null,'In simple words'),mk('p','exp',n.e||d.e));
    if(n.p){det.append(mk('h4',null,'Key points'));const ul=mk('ul','pts');n.p.forEach(x=>ul.append(mk('li',null,x)));det.append(ul)}
    if(d.c){det.append(mk('h4',null,'Example'));const pre=mk('pre');pre.append(mk('code',null,d.c));det.append(pre)}
    if(d.k)det.append(mk('p','tip','Remember: '+d.k));
    list.append(det);
  });
  if(!items.length)list.append(mk('p','exp','No topics found.'));
  stats();
}
function stats(){
  const n=DATA.filter(d=>done[d.t]).length;
  $('#prog').textContent=n+' / '+DATA.length+' revised';
  $('#bar').style.width=(n/DATA.length*100)+'%';
}
const tabs=$('#tabs');
Object.keys(SECS).forEach(k=>{
  const b=mk('button',k==sec?'on':'',SECS[k]);
  b.onclick=()=>{sec=k;[...tabs.children].forEach(x=>x.classList.toggle('on',x==b));render()};
  tabs.append(b);
});
$('#search').oninput=e=>{q=e.target.value.toLowerCase();render()};
$('#open').onclick=()=>{const ds=document.querySelectorAll('details');const o=[...ds].some(d=>!d.open);ds.forEach(d=>d.open=o);$('#open').textContent=o?'Collapse all':'Expand all'};
$('#reset').onclick=()=>{done={};save();render()};
render();
