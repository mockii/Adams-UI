
'use strict';

describe("adams.common.filters", function () {
    var $filter;

    beforeEach(module('adams.common.filters'));

    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
    }));

    describe("statusFilter ", function () {

        it('should statusFilter with null', function () {
            var value = null, result;
            result = $filter('statusFilter')(value);
            expect(result).toEqual(null);
        });

        it('should statusFilter with undefined', function () {
            var value = undefined, result;
            result = $filter('statusFilter')(value);
            expect(result).toEqual(null);
        });

        it('should statusFilter with Active', function () {
            var value = true, result;
            result = $filter('statusFilter')(value);
            expect(result).toEqual('Active');
        });

        it('should statusFilter with Inactive', function () {
            var value = false, result;
            result = $filter('statusFilter')(value);
            expect(result).toEqual('Inactive');
        });
    });
});