(function () {
    'use strict';

    var _ = require('lodash');
    var assert = require('assert');
    var simple = require('simple-mock');

    var Entity = require('../entity.js');
    var World = require('../world.js');

    describe('World', function () {
        var world;
        var mockSystem = {
            build: {
                testing: simple.mock()
            },
            destroy: {
                testing: simple.mock()
            },
            tickStart: simple.mock(),
            tickEnd: simple.mock(),
            update: {
                testing: simple.mock()
            }
        };

        beforeEach(function () {
            world = new World();
        });

        it('registered systems should call their update methods once for each added entity per world tick', function () {
            world.register(mockSystem);
            world.add(
                new Entity().attach({
                    $id: 'testing'
                })
            );

            assert.equal(mockSystem.update.testing.callCount, 0);

            world.tick();
            assert.equal(mockSystem.update.testing.callCount, 1);

            mockSystem.update.testing.reset();

            _.times(4, function () {
                world.add(
                    new Entity().attach({
                        $id: 'testing'
                    })
                );
            });

            world.tick();
            assert.equal(mockSystem.update.testing.callCount, 5);
        });

        it('registered systems should call their tickStart and tickEnd methods once regardless of how many entities there are', function () {
            world.register(mockSystem);
            world.add(
                new Entity().attach({
                    $id: 'testing'
                })
            );

            mockSystem.tickStart.reset();
            mockSystem.tickEnd.reset();

            assert.equal(mockSystem.tickStart.callCount, 0);
            assert.equal(mockSystem.tickEnd.callCount, 0);

            world.tick();

            assert.equal(mockSystem.tickStart.callCount, 1);
            assert.equal(mockSystem.tickEnd.callCount, 1);

            mockSystem.tickStart.reset();
            mockSystem.tickEnd.reset();

            _.times(4, function () {
                world.add(
                    new Entity().attach({
                        $id: 'testing'
                    })
                );
            });

            world.tick();

            assert.equal(mockSystem.tickStart.callCount, 1);
            assert.equal(mockSystem.tickEnd.callCount, 1);
        });

        it('if an entity has been added to a world, attaching a component to the entity should rebuild the entity.', function () {
            mockSystem.build.testing.reset();
            mockSystem.destroy.testing.reset();
            world.register(mockSystem);
            assert.equal(mockSystem.build.testing.callCount, 0);
            assert.equal(mockSystem.destroy.testing.callCount, 0);

            var entity = new Entity();
            world.add(entity);
            assert.equal(mockSystem.build.testing.callCount, 0);

            entity.attach({$id: 'testing'});
            assert.equal(mockSystem.build.testing.callCount, 1);
            assert.equal(mockSystem.destroy.testing.callCount, 1);

            entity.attach({$id: 'velvet'});
            assert.equal(mockSystem.build.testing.callCount, 1);
            assert.equal(mockSystem.destroy.testing.callCount, 1);

        });

        it('tracking should function as expected.', function () {
            mockSystem.$tracking = {'testing': 'many'};
            world.register(mockSystem);

            // Test tracking.
            var testEntity = world.add(
                new Entity().attach({
                    $id: 'testing'
                })
            );
            assert.deepEqual(
                mockSystem.$tracked.testing[testEntity.uid],
                testEntity
            );

            // Test for false positives.
            var testEntity2 = world.add(
                new Entity().attach({
                    $id: 'testing2'
                })
            );
            assert.equal(
                _.isUndefined(mockSystem.$tracked.testing[testEntity2.uid]),
                true
            );

            // Test untracking.
            world.remove(testEntity);
            assert.equal(
                _.isUndefined(mockSystem.$tracked.testing[testEntity.uid]),
                true
            );
        });

        it('should add a uid to systems when they are registered', function () {
            var freshMockSystem = {};
            assert.equal(_.isUndefined(freshMockSystem.$uid), true);
            world.register(freshMockSystem);
            assert.equal(_.isUndefined(freshMockSystem.$uid), false);
        });

    });

} ());
