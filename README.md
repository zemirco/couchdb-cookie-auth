
More info at my [blog](http://mircozeiss.com/couchdb-security-and-pouchdb-authentication/)

Create db `cookie-auth`.

CouchDB configuration:

```
[httpd]
enable_cors = true

[cors]
credentials = true
origins = http://localhost:3000

[couch_httpd_auth]
require_valid_user = true
```

## Important!

Cookie name must be `AuthSession`. CouchDB will then automatically detect the user session.