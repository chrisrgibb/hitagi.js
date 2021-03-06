(function () {
    'use strict';

    var hitagi = {
        'Entity': require('./entity.js'),
        'World': require('./world.js'),
        'utils': require('./utils.js'),
        'components': {
            'Collision': require('./components/collision.js'),
            'Position': require('./components/position.js'),
            'Velocity': require('./components/velocity.js'),

            'graphics': {
                'Circle': require('./components/graphics/circle.js'),
                'Ellipse': require('./components/graphics/ellipse.js'),
                'Graphic': require('./components/graphics/graphic.js'),
                'Line': require('./components/graphics/line.js'),
                'Polygon': require('./components/graphics/polygon.js'),
                'Rectangle': require('./components/graphics/rectangle.js'),
                'StaticSprite': require('./components/graphics/staticSprite.js'),
                'Sprite': require('./components/graphics/sprite.js'),
                'Text': require('./components/graphics/text.js')
            }
        },
        'prefabs': {
            'Base': require('./prefabs/base.js'),
            'Body': require('./prefabs/body.js'),
            'Static': require('./prefabs/static.js'),
            'StaticBody': require('./prefabs/staticBody.js')
        },
        'systems': {
            'CollisionSystem': require('./systems/collisionSystem.js'),
            'ControlsSystem': require('./systems/controlsSystem.js'),
            'PixiRenderSystem': require('./systems/pixiRenderSystem.js'),
            'RoomSystem': require('./systems/roomSystem.js'),
            'SoundSystem': require('./systems/soundSystem.js'),
            'VelocitySystem': require('./systems/velocitySystem.js')
        }
    };

    module.exports = hitagi;
} ());
