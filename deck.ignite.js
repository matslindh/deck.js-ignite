/*!
An extension for deck.js to run a presentation as an ignite
presentation. Each slide will be shown for 15 seconds before the
slide deck changes to the next slide automagically.

The first slide will be shown until the presentation is started,
and the last slide will end the show. Any manual navigation during
the slide show will cancel ignite mode, until a slide has been shown
for at least 15 seconds. The next forward move will yet again start
the slide deck in ignite mode.

Copyright (c) 2012 Mats Lindh
Licensed under the MIT license.
*/

/*
Runs a slide deck in ignite mode
*/
(function($, deck, undefined) {
    var lastChange = 0;
    var igniteActive = false;
    var intervalTimer = null;
    var countdownTimer = null;

    $.extend(true, $[deck].defaults, {
        igniteDelay: 15,
        showCountdown: false,
        selectors: {
            countdown: '.deck-ignite-countdown'
        }
    });

    $(document).bind('deck.change', function(event, from, to) {
        function stopIgniteMode()
        {
            igniteActive = false;

            if (opts.showCountdown)
            {
                $(opts.selectors.countdown).text('');
                clearInterval(countdownTimer);
            }

            clearInterval(intervalTimer);
        }

        var slideCount = $[deck]('getSlides').length;
        var opts = $[deck]('getOptions');

        // last slide ?
        if (to == (slideCount - 1))
        {
            stopIgniteMode();
        }
        // moving forward in the slide deck
        else if ((from+1) == to)
        {
            var currentTime = (new Date).getTime();

            // start ignite mode if not already active and
            // if we've been idle for more than 15 seconds
            if (!igniteActive && ((currentTime - lastChange) >= (opts.igniteDelay * 1000)))
            {
                igniteActive = true;

                if (opts.showCountdown)
                {
                    timeLeft = opts.igniteDelay - 1;

                    countdownTimer = setInterval(function() {
                        $(opts.selectors.countdown).text(timeLeft);
                        timeLeft -= 1;
                    }, 1000);
                }

                intervalTimer = setInterval(function() {
                    $[deck]('next');
                    timeLeft = opts.igniteDelay;
                }, opts.igniteDelay * 1000);
            }
        }
        else if ((to == 0) || (to < from))
        {
            stopIgniteMode();

            if (to == 0)
            {
                // make sure we start again if we move forward
                // from the first slide
                currentTime = 0;
            }
        }
    });
})(jQuery, 'deck');
