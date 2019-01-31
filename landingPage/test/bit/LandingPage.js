/*global define, describe, before, after, beforeEach, afterEach, it, expect */
define([
    'landingpage/LandingPage'
], function (LandingPage) {
    'use strict';

    describe('LandingPage', function () {

        it('Sample BIT test', function () {
            expect(LandingPage).not.to.be.undefined;
        });

    });

});
