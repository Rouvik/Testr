// generate and append console
const txt = document.createElement('textarea');
const txt_container = document.createElement('div');
txt_container.innerHTML = '<p>Look at console: </p>';
txt_container.appendChild(txt);
document.body.appendChild(txt_container);

txt.rows = 40; // set rows and columns
txt.cols = 50;
txt.readOnly = true;

// proxy logger
console.old = {
  log: console.log,
  warn: console.warn,
  error: console.error
};

console.log = (stuff) => {
  console.old.log(stuff);
  txt.value += '> ' + stuff + '\n';
}

console.warn = (stuff) => {
  console.old.warn(stuff);
  txt.value += '⚠️: ' + stuff + '\n';
}

console.error = (stuff) => {
  console.old.error(stuff);
  txt.value += '❌: ' + stuff + '\n';
}

// catch global and compile time errors
window.onerror = function(msg, url, line, col, error) {
  var extra = !col ? '' : '\nColumn: ' + col;
  extra += !error ? '' : '\nError: ' + error;
  txt.value += "❌: " + msg + "\nUrl: " + url + "\nLine: " + line + extra;
};

function assert(test, message) {
  const sta =  new Error().stack.split('\n');
  let stm = '';
  for(let i = 1; i < sta.length; i++) {
    stm += sta[i].trim() + '\n';
  }

  console.log('🧪Test ' + 
    (test == true ? 'PASSED[✅]' : 'FAILED[❎]') + 
    (message ? '(' + message + '): ' : ': ') +
    stm);
}

// include a script for tests to apply on
function includeScript(path, callback) {
  const script = document.createElement('script');
  script.src = path;
  script.onload = callback;
  document.body.appendChild(script);
}

// mock function factory
function mockFn(func = () => {}) {
  let fn = (...arg) => {
    fn.mock.args.push(arg); // store arguments
    fn.mock.instances.push(this); // store instances
    try {
      let value = func.apply(this, arg);
      fn.mock.results.push({type: 'return', value});
      return value;
    } catch (value) {
      fn.mock.results.push({type: 'throw', value});
      throw value;
    }
  };
  
  fn.mock = {
    args: [],
    instances: [],
    results: []
  };
  
  return fn;
}

// mock all functions of a implementation
function mockAll(object, preserveFunction = false) {
  for(let name in object) {
    if(typeof object[name] == 'function') {
      // if preserve then save and use the same func
      if (preserveFunction) {
        let fn = object[name];
        object[name] = mockFn(fn);
      } else {
        object[name] = mockFn();
      }
    }
    
    // mock recursively
    if(typeof object[name] == 'object') {
      object[name] = mockAll(object[name], preserveFunction);
    }
  }
  
  return object;
}

// returns the number of times a function is called
function numberOfCalls(fn) {
  return fn.mock.instances.length;
}

// returns an array of arguments of nth call
function nthArguments(fn, n = 0) {
  return fn.mock.args[n];
}

// returns the instance of nth call
function nthInstance(fn, n) {
  return fn.mock.instances[n];
}

// returns nth value or error thrown
function nthValue(fn, n) {
  return fn.mock.results[n];
}

// return true if function has thrown atleast once
function hasThrownOnce(fn) {
  return !!fn.mock.results.find((val) => val.type == 'throw');
}

// return true if function has returned atleast once
function hasReturnedOnce(fn) {
  return !!fn.mock.results.find((val) => val.type == 'return');
}