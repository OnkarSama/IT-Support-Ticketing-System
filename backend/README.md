# README

Hi guys

To start using the backend please open up a terminal and type the following commands in order
If its not working or I appear to have forgotten a step please don't hesitate to call or text

There's also a chance the gemfile will be missing a gem or two and that will need to be rectified

cd backend
bundle install
rails db:create
rails db:migrate
rails db:seed 

The USERS have one of three roles currently, "staff", "student" and "faculty". A user cannot have a role that is not within one of these groups.
Users with the "staff" role are the only privileged users, and if you want to edit or delete any ticket you need to log into a user account with that role

Before creating tickets, a user must be logged in. This login should store a cookie on the browser being used, however I've only tested this in postman so far, so I suspect this will need to be debugged

When creating and updating tickets please make sure the request is in application/json format and may have the following parameters

Ticket[title]: <title>
Ticket[description]: <description>
Ticket[status]: <status>

Each ticket must have a title and a description at least or there will be a validation error

Currently there is no way to create delete or update users through the API but this can be changed easily if needed; for now though
you can create or modify users through /db/seeds.rb, and running rails db:seed as needed.

Again let me know if there are any issues


