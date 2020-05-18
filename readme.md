## APE

Is a privacy preserving chrome extension that I built for my masters project in the summer of 2015

It protects against some browser fingerprinting libraries by spoofing certain browser metrics that are exploited, such as screen dimensions and user-agent string

APE will select a new 'profile' for these metrics in each new tab from a selection of the most common setups found in the wild (in 2015!)

Disclaimer: this extension has not been updated since 2015 and fingerprinting has undoubtably moved on considorably since then, but hopefully you find the basic structure useful and inspiring

[Tweet @ me](https://twitter.com/antwilson) if you find this interesting

## Requirements for running tests:

py27-selenium @2.21.2 (python)
    Python language binding for Selenium Remote Control

ChromeDriver - WebDriver for Chrome
	https://sites.google.com/a/chromium.org/chromedriver/getting-started
