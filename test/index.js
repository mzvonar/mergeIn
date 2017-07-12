const expect = require('expect');
const mergeIn = require('./../index');

describe('mergeIn', function() {
    const context = {
        user: {
            profile: {
                gender: 'female'
            }
        },
        type: 'best'
    };

    it('should merge values and return new copy by Array path', function() {
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
            type: 'best'
        });
    });

    it('should merge values and return new copy by string path', function() {
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
            type: 'best'
        });
    });
});