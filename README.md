# GeoIP lookup microservice (1.0.0)

### Install

Dependencies:

* [Docker](http://docker.com)
* [nginx-proxy container](https://registry.hub.docker.com/u/jwilder/nginx-proxy/)

#### How to install

		$ git clone https://github.com/carlosvillu/iplookup
		$ cd iplookup
		$ npm install
		$ npm start
		
Go to http://localhost:3000

#### How to deploy

		$ git clone https://github.com/carlosvillu/iplookup
		$ cd iplookup
		$ docker build -t iplookup .
		$ docker run -d -P -e VIRTUAL_HOST=subdomain.domain.com --name iplookup iplookup
		
### Description

The goal of this service is to provide an api with the following format,

	GET /api/v1/:ip
	
	RESPONSE
	
	200 {country: [country code]}
	404 not found (:ip is not IPv4)
	
Example: `http://ip.walmit.com/api/v1/ip/121.111.239.192`

#### How it works

When the server is launched, a csv file containing all IPs is processed. IPs are inserted into a Radix tree in order to optimize the search. 
 



