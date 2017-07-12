setIn [![Build Status](https://travis-ci.org/mzvonar/mergeIn.svg?branch=master)](https://travis-ci.org/mzvonar/mergeIn) [![Coverage Status](https://coveralls.io/repos/github/mzvonar/mergeIn/badge.svg?branch=master)](https://coveralls.io/github/mzvonar/mergeIn?branch=master) [![npm version](https://badge.fury.io/js/%40mzvonar%2Fmergein.svg)](https://badge.fury.io/js/%40mzvonar%2Fmergein)
=========

Sets value in object by path. Path can be string or array (e.g. ['user', 'profile', 'gender']).  
If any part of path doesn't exist it is created. Always returns new copy of object.

## Installation

  `npm install @mzvonar/mergein`

## Usage

```javascript
const setIn = require('@mzvonar/mergein');
  
const context = {
    user: {
        profile: {
            gender: 'female'
        }
    }
};
  
const newContext = setIn(context, ['user', 'profile'], {
    gender: 'male',
    address: {
        country: 'slovakia'
    }
});
 ```
 
  returns:
```javascript  
    {
        user: {
            profile: {
                gender: 'male',
                address: {
                        country: 'slovakia'
                    }
            }
        }
    }
``` 

```javascript  
const newContext = setIn(context, 'user', {
    address: {
      country: 'slovakia'
    }
);
 ```
 
  returns:
```javascript  
    {
        user: {
            profile: {
                gender: 'female',
            },
            address: {
                country: 'slovakia'
            }
        }
    }
``` 

## Tests

  `npm test`