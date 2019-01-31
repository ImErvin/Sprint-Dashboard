/*global define, describe, before, after, beforeEach, afterEach, it, expect */
define([
    'manageteam/ManageTeam'
], function (ManageTeam) {
    'use strict';

    describe('ManageTeam', function () {

        it('Sample BIT test', function () {
            expect(ManageTeam).not.to.be.undefined;
        });

    });

});
