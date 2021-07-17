# Movie Server
My Movie App is an application to manage your movie database data. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
- `POST/register`
- `POST/login`
- `GET/movies`
- `POST/movies`
- `GET/movies/:id`
- `PUT/movies/:id`
- `DELETE/movies/:id`

### POST /register

> register new user

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "admin1@admin.com",
  "password": "123456789",
  "role": "admin",
  "phoneNumber": "081294180290",
  "address": "rumah samping pengisian bensin harian"
}
```

_Response (201 - Created)_
```
{
    "email": "admin1@admin.com",
    "password": "$2a$08$zOcM.PG.cjP70yYrUBs4uuG7G7cpG3YZGny8FpAoAV/FWyM9RW8qG"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Services Error"
}
```
---

### POST /login

> login specific user

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "email": "admin1@admin.com",
    "password": "123456789"
}
```

_Response (200)_
```
{
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjFAYWRtaW4uY29tIiwiaWF0IjoxNjI1NDk2MTMxLCJleHAiOjE2MjU0OTk3MzF9.Jb8YdMlvFc9jEW7YmJ-0Q_TcoJxbDProz87Rauq4oEU"
}
```

_Response (401 - User does'nt exist)_
```
{
  "message": "Invalid Account"
}
```
_Response (404 - User does'nt exist)_
```
{
  "message": "User does'nt exist"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Services Error"
}
```
---


### GET /movies

> Get all movies

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
      "id": 1,
      "title": "Kuyang Terbang Reborn",
      "synopsis": "Pokoknya Kuyang bisa terbang",
      "trailerUrl": "link youtube",
      "imgUrl": "link image",
      "rating": 80,
      "GenreId": null,
      "AuthorId": null,
      "createdAt": "2021-07-05T11:42:38.236Z",
      "updatedAt": "2021-07-05T12:30:17.670Z"
  },
  {
      "id": 2,
      "title": "Monster Hunter",
      "synopsis": "Pokoknya Monster",
      "trailerUrl": "link youtube",
      "imgUrl": "link image",
      "rating": 100,
      "GenreId": null,
      "AuthorId": null,
      "createdAt": "2021-07-05T11:47:36.089Z",
      "updatedAt": "2021-07-05T11:47:36.089Z"
  }
]
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Services Error"
}
```
---
### POST /movies

> Create new movies

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": 5,
  "title": "Manusia Setengah Nodemon",
  "synopsis": "Ini Sinopsis",
  "trailerUrl": "Ini Trailer",
  "imgUrl": "Ini Image",
  "rating": 100
}
```

_Response (201 - Created)_
```
{
    "id": 5,
    "title": "Manusia Setengah Nodemon",
    "synopsis": "Ini Sinopsis",
    "trailerUrl": "Ini Trailer",
    "imgUrl": "Ini Image",
    "rating": 100,
    "updatedAt": "2021-07-05T14:00:14.693Z",
    "createdAt": "2021-07-05T14:00:14.693Z",
    "GenreId": null,
    "AuthorId": null
}
```

_Response (400 - Validation Error)_
```
{
  "message": "Validation error"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Services Error"
}
```
---

### GET /movies/:id

> Get specific movies

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": 2
}
```

_Response (200)_
```
{
    "id": 2,
    "title": "Monster Hunter",
    "synopsis": "Pokoknya Monster",
    "trailerUrl": "link youtube",
    "imgUrl": "link image",
    "rating": 100,
    "GenreId": null,
    "AuthorId": null,
    "createdAt": "2021-07-05T11:47:36.089Z",
    "updatedAt": "2021-07-05T11:47:36.089Z"
}
```

_Response (400 - Id not found)_
```
{
  "message": "Error Not Found!"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Services Error"
}
```
---

### UPDATE /movies/:id

> UPDATE specific movies

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": 2,
  "title": "Kuyang Reborn New Edition",
  "synopsis": "Pokoknya Kuyang bisa terbang",
  "trailerUrl": "link youtube",
  "imgUrl": "link image",
  "rating": 80,
}
```

_Response (200)_
```
{
    "id": 2,
    "title": "Kuyang Reborn New Edition",
    "synopsis": "Pokoknya Kuyang bisa terbang",
    "trailerUrl": "link youtube",
    "imgUrl": "link image",
    "rating": 80,
    "GenreId": null,
    "AuthorId": null,
    "createdAt": "2021-07-05T11:47:36.089Z",
    "updatedAt": "2021-07-05T14:18:32.624Z"
}
```

_Response (400 - Validation Error)_
```
{
  "message": "Validation error"
}
```
_Response (404 - Id not found)_
```
{
  "message": "Error Not Found!"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Services Error"
}
```
---

### DELETE /movies/:id

> DELETE specific movies

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": 6,
}
```

_Response (200)_
```
{
    "deleted": {
        "id": 6,
        "title": "Manusia Setengah Nodemon",
        "synopsis": "Ini Sinopsis",
        "trailerUrl": "Ini Trailer",
        "imgUrl": "Ini Image",
        "rating": 100,
        "GenreId": null,
        "AuthorId": null,
        "createdAt": "2021-07-05T14:00:14.693Z",
        "updatedAt": "2021-07-05T14:00:14.693Z"
    }
}
```

_Response (400 - Validation Error)_
```
{
  "message": "Validation error"
}
```
_Response (404 - Id not found)_
```
{
  "message": "Error Not Found!"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Services Error"
}
```
---

