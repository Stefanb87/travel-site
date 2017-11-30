import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
    constructor() {
        this.lazyImages = $(".lazyload");
        this.siteHeader = $(".site-header");
        this.headTrigElem = $(".large-hero__title");
        this.createHeaderWaypoint();
        this.refreshWaypoints();
    }

    refreshWaypoints() {
        this.lazyImages.on('load', function() {
            Waypoint.refreshWaypoints();
        });
    }

    createHeaderWaypoint() {
        var that = this;
        new Waypoint({
            element: this.headTrigElem[0],
            handler: function(direction) {
                if (direction == "down") {
                    that.siteHeader.addClass("site-header--dark");
                } else {
                    that.siteHeader.removeClass("site-header--dark");
                }
            }
        });
    }
}

export default StickyHeader;