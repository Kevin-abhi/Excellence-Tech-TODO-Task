import { Datastore } from 'codehooks-js' // Standard Codehooks.io lib
import fetch from 'node-fetch';

// middleware to get Auth0 user info in request
// all routes will now have access to user info in req.user
// adapt this to your own needs

export const userProfileFromAuth0 = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.replace('Bearer ','');
        const conn = await Datastore.open();
  
        // try to load user from codehooks.io key/value store
        const user = await conn.get(`token-${token}`, { keyspace: 'sessions'});
  
        // found in cache?
        if (user){
          req.user = JSON.parse(user);
          return next();
        }
  
        // fetch user from Auth0 API
        const resp = await fetch(`https://dev-nofd3nl3.us.auth0.com/userinfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        req.user = await resp.json();
  
        // store in key/value store for twenty minutes
        conn.set(`token-${token}`, JSON.stringify(req.user),{ keyspace: 'sessions', ttl: 1000 * 60 * 20}); // ttl twenty minutes
      }
      else {
        return res.status(401).send('Nope');
      }
      next();
    } catch (error) {
      next(error);
    } 
  }