var webdriver = require('selenium-webdriver');
var path = require('chromedriver').path;
var path = require('selenium-webdriver/firefox');
var loader = require('csv-load-sync');

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.firefox())
    .build();

var Eyes = require('eyes.selenium').Eyes;
var ConsoleLogHandler = require('eyes.images').ConsoleLogHandler;
//var StitchMode = require('eyes.StitchMode');
var eyes = new Eyes();
// This is your api key, make sure you use it in all your tests.
eyes.setHostOS("Mac OS X");
eyes.setApiKey('aMMQjBVWo9ncITBLP3yJwdpHC9IahitotwCOBSTTed0110');
eyes.setLogHandler(new ConsoleLogHandler(true));
eyes.setHideScrollbars(true);
eyes.setForceFullPageScreenshot(true);

eyes.setBatch("scottish")
//eyes.setMatchLevel("Layout");
// Start visual testing with browser viewport set to 1024x768.

var csv = loader('testfile.csv');
csv.forEach(item => {
    eyes.open(driver, 'Applitools', item.title, {
            width: 649,
            height: 600
        })
        .then(function (driver) {
            //URL 1
            driver.get(item.url);
            // Visual validation point #1
            eyes.checkWindow(item.title);
            eyes.close();
        });

});
driver.close();
eyes.abortIfNotClosed();