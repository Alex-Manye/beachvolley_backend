# Beach volley tournament

## Description

This is an app (in React) for beach volley players who want to join sport events created by other beach volley players. The goal is to help users to organize better their sports championship. 

The user will be able to register to see all sports events information and be able to register in the different matchs.

Now, in the MVP, the users register as a team. In future developments, I will add a USER Model (now is Team Model) and the users will be able to create teams and join the matchs with their teams.

## User Stories

# ANON
- **404:**  As an anon/team of users I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
- **SignUp:**  As an anon/team of users I can sign up in the platform so that I see a list with the sport events.
- **Login:**  As a Anon I can login to the platform so that I can register my team in the  beach volley events 
- **Home Page:** As an anon I can see the home page with the sports events (but I am not able to join any event until I register in the app) and I can sign up/login form.
- **sports events' list (Anon):** As an anon I can see a list of sport events, and filter them, and view the details of each sport match

# USER

- **Add sport events:** As a user I can add an event so that the players can watch the information and register
- **sports events' list (User):** As a user I want to view the next sport events so that I can register in all that I want to participate.
- **sports events' details (User):** As a user I can click in any sport event to view more information so that I can decide if I want to join it.
- **edit events' details (User/Owner):** As a user who has created an event (owner) I can edit event's details so taht I can update its information.
- **delete events (User/Owner):** As a user who has created an event (owner) I can delete that event so that the event's list will be updated with teh most recent events.
- **join events (User):** As a user I can join any sport event from the list and I will receive a message so that I will know for sure that I will be registered. 
- **Logout:** as a team/user I can logout from the platform


## Backlog

- **teams registered in an event:** As a owner of an event I can view the teams registered to that event so that I can organize it better (backlog)
- **editProfile:** as a team/user i can edit my profile with aditional and usefull data 
- **sort sport events by date:** As a User i can seen sports events ordered by date so that I can


## Models

Team model

```
teamName: String,
email: String, unique & required 
password: String, required 
playerName1: String,
IDPlayer1: String,
playerName2: String,
IDPlayer2: String,
events: [{type: ObjectId, ref:"Event"}],

```

Event model

```
eventName: String, 
teams: ObjectId<User> 
owner: ObjectId<User> 
location: String,
day: String, 
time: String, 
description: String,

```


# Client / Frontend

## Routes
| Path | Component | Permissions | Behavior |
| - | - | - | - |
| `/` | HomePage > MainHeader, WhatIs, ChallengeDetail, HowTo | public | Home page with 4 sections: Sport events, Add an event, Profile, Logout |
| `/not-found` | NotFoundPage | public | Not found page |
| `/signup` | SignupPage | public | Sign up page |
| `/login` | LoginPage | public | Log in page |
| `/team/<:teamId>` | UserPage > UserProfile | user only | Shows the details of a user and all user's challenges |
| `/user/<:userId>/profile` | UserPage > UserProfile | user only | Shows the details of a user/team |

| `/user/edit` | ProfilePage | user only | Profile form for update |

| `/events` | ChallengeListPage > ChallengeCard, ChallengeFilter, ChallengeSearcher, StatusToggle | public | Shows all challenges in a list |
| `/events/:eventsId` | EventDetailPage > EventDetail | user only | Shows the details of a sports event |
| `/events/add` | AddEditPage | user only | Form for add a new event |
| `/events/edit` | EventPage |owner only | Event form for update |

| `/events/delete` | DeletePage |owner only | delete button |



<br>## API Endpoints (backend routes)

| HTTP Method | URL | Request Body | Success status | Error Status | Description |
| - | - | - | - | - | - |
| GET | /user/:id | id | 200 | 404 | get other user data|
| PUT | /user/edit | {userUpdate} | | | edit user data |
| PUT | /user/password/edit | {newPassword} | | | edit password |
| GET | /auth/me | | 201 | 404 | get my user from session |
| POST | /auth/signup | {teamname, email, password} | 201 | 404 | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST | /auth/login | {teamName, email, password, playerName1, playerName2} | 200 | 401 | Checks if fields not empty (422), if user exists (404), and if password challenges (404), then stores user in session |


Links
Trello board : https://trello.com/b/biTYBdSo/becah-volley-app

Git
Client repository Link: https://github.com/Alex-Manye/beachvolley_frontend

Server repository Link: https://github.com/Alex-Manye/beachvolley_backend

© 2019 GitHub, Inc.