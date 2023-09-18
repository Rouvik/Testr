# Testr
A simple single file Javascript testing library

# How to use?
Just add the Testr.js library to your code as a source file
<code><script src="PATH_TO_WORK_DIR/Testr.js"></script></code>

# Function description
*assert*: Simply checks if a given test (boolean expression) is valid or not and fails with proper message and error written in console<br><br>
*mockFn*: Creates a mockFunction for an existing function to perform various checks on it<br><br>
*mockAll*: Transforms all functions in an object to mockFn, takes an optional argument preserveFunction if false then replaces existing functions with a blank mockFn<br><br>
*numberOfCalls*: Returns number of calls of a mockFn<br><br>
*nthArguments*: Returns the nth argument passed in [n] for assertion<br><br>
*nthInstance*: Returns the nth instance passed in [n] for assertion<br><br>
*nthValue*: Returns the nth value returned passed in [n] for assertion<br><br>
*hasThrownOnce*: Returns true if the function has thrown once<br><br>
*hasReturnedOnce*: Returns true if the function has returned once<br><br>

# Example:
```
let x = 5;
x = x * 2 - 3 / 5 % 3;
assert(x == 9.4, 'Output: ' + x);
function beep() {
  console.log('Boop!');
} 
const m_beep = mockFn(beep);
m_beep();
m_beep(); 
assert(numberOfCalls(m_beep) == 2, 'Not called twice?');
```

# Author
Rouvik Maji [gmail](mailto:majirouvik@gmail.com)
