# StaginatorJD

Tool to create and run stagings in easy way for developers. stagins are run on subdomains called from branchname of development project

### supports:
    -  github 
    -  gitlab

### requirements:
    -   docker ^v18.03.0-ce
    -   docker-compose ^1.19.0
    -   nginx
    -   route all wildcard dns routes of base domain (sent in env) to this host

### installation:
    -   create .env file (copy base .env.dist) and set values in it
    -   nginx default domain must route to 80 port of this host
    -   nginx wildcard subdoimain must route to to 80 port of this host and path: /staging_check

### run:
    -   docker-compose build (only build images)
    or
    -   docker-compose run (build if not exist and run images)
    or
    -   docker-compose run -d (build if not exist and run as daemon)
