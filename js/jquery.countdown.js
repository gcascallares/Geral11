(function ($) {

    // Number of seconds in every time division
    var days = 24 * 60 * 60,
        hours = 60 * 60,
        minutes = 60;

    // Creating the plugin
    $.fn.countdown = function (prop) {

        var options = $.extend({
            callback: function () { },
            timestamp: 0
        }, prop);

        var left, d, h, m, s, positions;

        // Initialize the plugin
        init(this);

        positions = this.find('.position');

        (function tick() {

            // Time left in seconds
            left = Math.floor((options.timestamp - new Date()) / 1000);

            // Si terminó
            if (left <= 0) {

                updateDuo(0, 1, 0);
                updateDuo(2, 3, 0);
                updateDuo(4, 5, 0);
                updateDuo(6, 7, 0);

                options.callback(0, 0, 0, 0, true);

                return; // corta el loop
            }

            // Days
            d = Math.floor(left / days);
            updateDuo(0, 1, d);
            left -= d * days;

            // Hours
            h = Math.floor(left / hours);
            updateDuo(2, 3, h);
            left -= h * hours;

            // Minutes
            m = Math.floor(left / minutes);
            updateDuo(4, 5, m);
            left -= m * minutes;

            // Seconds
            s = left;
            updateDuo(6, 7, s);

            // callback normal
            options.callback(d, h, m, s, false);

            // sigue cada 1 segundo
            setTimeout(tick, 1000);

        })();

        function updateDuo(minor, major, value) {
            switchDigit(positions.eq(minor), Math.floor(value / 10) % 10);
            switchDigit(positions.eq(major), value % 10);
        }

        return this;
    };


    function init(elem) {

        elem.addClass('countdownHolder');

        $.each(['Days', 'Hours', 'Minutes', 'Seconds'], function (i) {

            $('<span class="count' + this + '">').html(
                '<span class="position">' +
                '<span class="digit static">0</span>' +
                '</span>' +
                '<span class="position">' +
                '<span class="digit static">0</span>' +
                '</span>'
            ).appendTo(elem);

            if (this != "Seconds") {
                elem.append('<span class="countDiv countDiv' + i + '"></span>');
            }
        });
    }


    function switchDigit(position, number) {

        var digit = position.find('.digit');

        if (digit.is(':animated')) {
            return false;
        }

        if (position.data('digit') == number) {
            return false;
        }

        position.data('digit', number);

        var replacement = $('<span>', {
            'class': 'digit',
            css: {
                top: '-2.1em',
                opacity: 0
            },
            html: number
        });

        digit
            .before(replacement)
            .removeClass('static')
            .animate({
                top: '2.5em',
                opacity: 0
            }, 'fast', function () {
                digit.remove();
            });

        replacement
            .delay(100)
            .animate({
                top: 0,
                opacity: 1
            }, 'fast', function () {
                replacement.addClass('static');
            });
    }

})(jQuery);
