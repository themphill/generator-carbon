# generator-carbon
A [Yeoman](http://yeoman.io/) generator for scaffolding a Carbon Backbone app.

## Dependencies

Make sure you're on the latest stable version of node. If you need to update, the [n](https://github.com/tj/n) module is a great way to do that.

_Note: You may need to `sudo` these commands._

```
> npm i -g n
> n lts
```

Also make sure you have the latest verion of `npm`. npm knows how to update itself.

```
> npm i -g npm
```

Now install the Yeoman command line tool.

```
> npm i -g yo
```

## Install

This module isn't on `npm`, but you can install it using the github URL.

```
> npm i -g https://github.com/themphill/generator-carbon/tarball/master
```

## Usage

The generator works anywhere inside the [CRBN](https://github.com/cloudvox/CRBN) repo and it always knows to create your module in `CRBN/application/modules`. Simply invoke the `yo` command with the name of the generator, `carbon`. You can either pass your app's name on the commad line as an argument, or run it without any arugments and be prompted to enter a name.

_Note: The app's name should be entered as you'd like to see it displayed (e.g. Sourcetrak, LeadFlow, etc.). This name will become the namespace for your project._

```
> cd /path/to/CRBN
> yo carbon MyApp
```

or

```
> cd /path/to/CRBN
> yo carbon
Welcome to the marvelous Carbon App generator!
? Enter the name of your application as you'd like to see it displayed (e.g. Sourcetrak, LeadFlow, etc.) (MyApp)
```

And that's it! Just commit those files and you're all set up.

## Contributing

If you have a feature you'd like to see or an issue you need resolved, just open a new Issue.
