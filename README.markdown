# deck.js-ignite
Extension for deck.js to run your slide deck as an Ignite or Pecha Kucha
presentation (or any other pre-timed variation).

## License
Licensed under the MIT license.

## Usage
Place deck.ignite.js in an extensions/ignite directory under your deck.js
installation (you'll have to create this directory) (or a different 
location if you prefer - this is your world, after all).

Add a reference to the deck.ignite.js file after you've loaded deck.core.js:

    <script type="text/javascript" src="deck.js/extensions/ignite/deck.ignite.js"></script>

Then simply start your presentation - the slide deck will progress 
automagically after a configurable delay (15 seconds by default for 
Ignite, set to 20 seconds for Pecha Kucha).

You can configure the delay when initializing deck.js:

     $.deck(".slide", { igniteDelay: 20 });

.. will use a slide delay of 20 seconds instead of 15.

deck.ignite.js tries to get out of your way if you suddenly start to 
navigate your slide deck manually. If you move backwards, it will exit 
ignite mode and not become active again until you've waited at least the
configured delay on a slide before moving forward in your deck (so to
restart after navigating to a different slide, wait 15 seconds and then
move manually forward. Ignite mode should automagically resume.)

