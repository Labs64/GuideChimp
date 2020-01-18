<a href="https://netlicensing.io"><img src="https://netlicensing.io/img/netlicensing-stage-twitter.jpg" alt="Innovative License Management Solution"></a>

# [Labs64 NetLicensing](https://netlicensing.io) Client (JavaScript)

[![Build Status](https://travis-ci.org/Labs64/NetLicensingClient-javascript.svg?branch=master)](https://travis-ci.org/Labs64/NetLicensingClient-javascript)
[![npm version](https://badge.fury.io/js/netlicensing-client.svg)](https://badge.fury.io/js/netlicensing-client)
[![](https://data.jsdelivr.com/v1/package/npm/netlicensing-client/badge)](https://www.jsdelivr.com/package/npm/netlicensing-client)

JavaScript wrapper for Labs64 NetLicensing [RESTful API](http://l64.cc/nl10)

Visit Labs64 NetLicensing at https://netlicensing.io

## How to Use

NetLicensing JavaScript Client was designed to work both in the browser and in Node.js.

In order to use NetLicensing JavaScript Client, you must include the compiled and minified JavaScript file in your project. There are multiple options for including these pre-compiled files, also known as a distribution, in your website or application.

### Using from a CDN

A CDN (Content Delivery Network) is the fastest way to get up and running with NetLicensing JavaScript Client.
Simply include the following lines of code in the `<head>` section of your page using latest [released version](https://github.com/Labs64/NetLicensingClient-javascript/releases):
```
<script src="https://cdn.jsdelivr.net/gh/Labs64/NetLicensingclient-javascript@x.y.z/dist/netlicensing-client.min.js"></script>
```

### Installing with Node.js / npm

NetLicensing JavaScript Client is available on [npmjs](https://www.npmjs.com/package/netlicensing-client). Add the following to your `package.json` file and then run `npm install`:
```
"dependencies": {
    "netlicensing-client": "x.y.z"
}
```

or execute following command in your Node.js environment:

```
$ npm install netlicensing-client
```

### Manual installation

We strongly recommend that you use either a CDN or a package manager like npm. This will make it easier for you to deploy your project in different environments, and easily update NetLicensing JavaScript Client when new versions are released. Nonetheless, if you prefer to integrate NetLicensing into your project manually, you can [download the release of your choice](https://github.com/Labs64/NetLicensingClient-javascript/releases) from GitHub and copy the files from the `dist` directory into your project.

Include the compiled files in your page:
```
<script src="path/to/netlicensing-client.min.js"></script>
```

Check out project [wiki](https://github.com/Labs64/NetLicensingClient-javascript/wiki) pages for detailed usage instructions.

## Online Demo

Demo web application for this library can be found [here](http://io.labs64.com/NetLicensingClient-javascript/client-demo.html) as well as [source code](https://github.com/Labs64/NetLicensingClient-javascript/tree/master/docs).

## Development

Here is a Docker-based local development environment prepared, which provides a very flexible and extensible way of developing Node.js applications.

### System Requirements
To be able to build this library you have to meet the following requirements:
* [docker](https://www.docker.com)
To be able to build this NetLicensing Client you have to meet the following requirements:
* Node.js > 6.0
* npm > 3.10.x

### Develop with Docker

1. Clone repository
```
$ git clone https://github.com/Labs64/NetLicensingClient-javascript.git
```

2. Prepare docker image
```
$ docker build -t labs64/nodejs .
```

3. Start local development environment
```
$ docker run -v $(pwd):/opt/NetLicensingClient-javascript -i -t labs64/nodejs /bin/bash
```

4. Configure git using your eMail and Username
```
$ git config --global user.email "eMail"
$ git config --global user.name "User Name"
```

## How to Contribute

Everyone is welcome to contribute to this project!
Once you're done with your changes send a pull request and check [CI validation status](https://travis-ci.org/Labs64/NetLicensingClient-javascript).
Thanks!

## Bugs and Feedback

For bugs, questions and discussions please use the [GitHub Issues](https://github.com/Labs64/NetLicensingClient-javascript/issues).

## License

This boilerplate is open-sourced software licensed under the [Apache License Version 2.0](LICENSE).

---

Visit Labs64 NetLicensing at https://netlicensing.io
