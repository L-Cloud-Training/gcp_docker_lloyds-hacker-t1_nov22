# Share&Care Application

Share&Care application is a rapidly growing social network primarily focused on supporting worthy causes all over the world. It has been refactored into a number of microservices written in NodeJS. Application now consists of 5 microservices. Source code for each of them is in its spearate folder inside of this repository.

## Share&Care Microservices

- Share&Care WebApp: Your customers use this web application to login and use the social network. Users interactions (raising awareness and getting funds via posting about a certain charity) are manifested against the APIs within your environment. 

- Charity API: The user through web application can create its own charity, as well as charity is connected to any post that is about that same charity. Charity API is able to list charities, add funds to a certain charity, and get or change the status of a certain charity. 

- Media API: This API is used by the post created by the user that refers to a certain charity. 

- Posts API: This API is used to refer the post user created to a certain charity. 

- User API: This API is used by the application to create and modify the users. 

## Working Solution

For your reference, working version of the solution can be accessed here: http://sharecare.tipuric.com 
