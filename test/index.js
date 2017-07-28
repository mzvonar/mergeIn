const expect = require('expect');
const mergeIn = require('./../index');

describe('mergeIn', function() {
    let context;
    
    beforeEach(function() {
        context  = {
            user: {
                profile: {
                    gender: 'female'
                }
            },
            type: 'best',
            colors: ['red', 'green', 'blue']
        };
    });

    function verifyOriginalContext(context) {
        expect(context).toEqual({
            user: {
                profile: {
                    gender: 'female'
                }
            },
            type: 'best',
            colors: ['red', 'green', 'blue']
        });
    }

    it('should merge object and return new copy by Array path', function() {
        const newContext = mergeIn(context, ['user', 'profile'], {
            gender: 'male',
            address: {
                country: 'slovakia'
            }
        });

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {
                    gender: 'male',
                    address: {
                        country: 'slovakia'
                    }
                }
            },
            type: 'best',
            colors: ['red', 'green', 'blue']
        });

        verifyOriginalContext(context);
    });

    it('should merge array and return new copy by Array path', function() {
        const newContext = mergeIn(context, ['colors'], ['yellow', 'magenta']);

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {
                    gender: 'female'
                }
            },
            type: 'best',
            colors: ['red', 'green', 'blue', 'yellow', 'magenta']
        });

        verifyOriginalContext(context);
    });

    it('should merge object and return new copy by string path', function() {
        const newContext = mergeIn(context, 'user', {
            address: {
                country: 'slovakia'
            }
        });

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {
                    gender: 'female'
                },
                address: {
                    country: 'slovakia'
                }
            },
            type: 'best',
            colors: ['red', 'green', 'blue']
        });

        verifyOriginalContext(context);
    });

    it('should merge array and return new copy by string path', function() {
        const newContext = mergeIn(context, 'colors', ['yellow', 'magenta']);

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {
                    gender: 'female'
                }
            },
            type: 'best',
            colors: ['red', 'green', 'blue', 'yellow', 'magenta']
        });

        verifyOriginalContext(context);
    });

    it('should merge object right into context if path is not provided', function() {
        const newContext = mergeIn(context, {
            car: {
                color: 'red'
            }
        });

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {
                    gender: 'female'
                }
            },
            type: 'best',
            colors: ['red', 'green', 'blue'],
            car: {
                color: 'red'
            }
        });

        verifyOriginalContext(context);
    });

    it('should merge array right into context if path is not provided', function() {
        const context = ['red', 'green', 'blue'];

        const newContext = mergeIn(context, ['cyan', 'black']);

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual(['red', 'green', 'blue', 'cyan', 'black']);

        expect(context).toEqual(['red', 'green', 'blue']);
    });

    it('should create path by array if it does not exist', function() {
        const newContext = mergeIn(context, ['car', 'accessories'], {
            tyres: true,
            brakes: false
        });

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {
                    gender: 'female'
                }
            },
            type: 'best',
            colors: ['red', 'green', 'blue'],
            car: {
                accessories: {
                    tyres: true,
                    brakes: false
                }
            }
        });

        verifyOriginalContext(context);
    });

    it('should create path by string if it does not exist', function() {
        const newContext = mergeIn(context, 'car', {
            tyres: true,
            brakes: false
        });

        expect(newContext).toNotBe(context);
        expect(newContext).toEqual({
            user: {
                profile: {
                    gender: 'female'
                }
            },
            type: 'best',
            colors: ['red', 'green', 'blue'],
            car: {
                tyres: true,
                brakes: false
            }
        });

        verifyOriginalContext(context);
    });

    it('should throw error if context is falsy', function() {
        expect(function() {
            mergeIn(undefined, ['user', 'profile'], {
                gender: 'male',
                address: {
                    country: 'slovakia'
                }
            });
        }).toThrow('Context is falsy.');

        expect(function() {
            mergeIn(null, ['user', 'profile'], {
                gender: 'male',
                address: {
                    country: 'slovakia'
                }
            });
        }).toThrow('Context is falsy.');

        expect(function() {
            mergeIn(false, ['user', 'profile'], {
                gender: 'male',
                address: {
                    country: 'slovakia'
                }
            });
        }).toThrow('Context is falsy.');
    });

    it('should throw error if context is string', function() {
        expect(function() {
            mergeIn('some string', ['user', 'profile'], {
                gender: 'male',
                address: {
                    country: 'slovakia'
                }
            });
        }).toThrow('Trying to add property to [object String]');
    });

    it('should throw error if context types does not match', function() {
        expect(function() {
            mergeIn(context, ['type'], {
                gender: 'male',
                address: {
                    country: 'slovakia'
                }
            });
        }).toThrow('Cannot merge [object Object] into [object String]');

        expect(function() {
            mergeIn(context, ['type'], ['red', 'white']);
        }).toThrow('Cannot merge [object Array] into [object String]');

        expect(function() {
            mergeIn(context, ['user', 'profile'], ['nice', 'honest']);
        }).toThrow('Cannot merge [object Array] into [object Object]');

        expect(function() {
            mergeIn(context, ['colors'], {
                red: true,
                green: false
            });
        }).toThrow('Cannot merge [object Object] into [object Array]');
    });
});