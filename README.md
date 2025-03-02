```
$ http post :5173/api/auth/sign-up username=user1 password=password1
HTTP/1.1 201 Created
Vary: Origin
connection: close
content-length: 70
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:01:10 GMT
etag: W/"46-6ki8CbIB9QiivqNI2gVMfuMp1fw"
x-powered-by: Express

{
    "createdAt": "2025-03-02T07:01:10.497Z",
    "userId": 1,
    "username": "user1"
}

$ http post :5173/api/auth/sign-in username=user1 password=password1
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 196
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:02:18 GMT
etag: W/"c4-9mjHGKmCVezH26siUS+Q7rv0wEs"
x-powered-by: Express

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE",
    "user": {
        "userId": 1,
        "username": "user1"
    }
}

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 2
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:13:19 GMT
etag: W/"c4-gezfGlo6a8KXt2PBCRcw1xt1AA4"
x-powered-by: Express

[]

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE post :5173/api/movies title=Rocky summary=Boxer link=https://www.imdb.com/title/tt0075148/ rating:=3
HTTP/1.1 201 Created
Vary: Origin
connection: close
content-length: 194
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:04:29 GMT
etag: W/"c2-5wHE2ZIyGGJckR/LFt8SLudeJRE"
x-powered-by: Express

{
    "createdAt": "2025-03-02T07:04:29.195Z",
    "link": "https://www.imdb.com/title/tt0075148/",
    "movieId": 1,
    "rating": 3,
    "summary": "Boxer",
    "title": "Rocky",
    "updatedAt": "2025-03-02T07:04:29.195Z",
    "userId": 1
}

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 196
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:13:19 GMT
etag: W/"c4-gezfGlo6a8KXt2PBCRcw1xt1AA4"
x-powered-by: Express

[
    {
        "createdAt": "2025-03-02T07:04:29.195Z",
        "link": "https://www.imdb.com/title/tt0075148/",
        "movieId": 1,
        "rating": 3,
        "summary": "Boxer",
        "title": "Rocky",
        "updatedAt": "2025-03-02T07:04:29.195Z",
        "userId": 1
    }
]

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE post :5173/api/movies title="Shawshank Redemption" summary="Prison escape about hope." link=https://www.imdb.com/title/tt0111161/ rating:=5
HTTP/1.1 201 Created
Vary: Origin
connection: close
content-length: 229
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:14:56 GMT
etag: W/"e5-JugrOqjhMStJpVy/nSzxYX0h2bI"
x-powered-by: Express

{
    "createdAt": "2025-03-02T07:14:56.833Z",
    "link": "https://www.imdb.com/title/tt0111161/",
    "movieId": 2,
    "rating": 5,
    "summary": "Prison escape about hope.",
    "title": "Shawshank Redemption",
    "updatedAt": "2025-03-02T07:14:56.833Z",
    "userId": 1
}

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 426
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:15:59 GMT
etag: W/"1aa-mTMoNif7lwy5o5GJrsmj8lkCzUs"
x-powered-by: Express

[
    {
        "createdAt": "2025-03-02T07:04:29.195Z",
        "link": "https://www.imdb.com/title/tt0075148/",
        "movieId": 1,
        "rating": 3,
        "summary": "Boxer",
        "title": "Rocky",
        "updatedAt": "2025-03-02T07:04:29.195Z",
        "userId": 1
    },
    {
        "createdAt": "2025-03-02T07:14:56.833Z",
        "link": "https://www.imdb.com/title/tt0111161/",
        "movieId": 2,
        "rating": 5,
        "summary": "Prison escape about hope.",
        "title": "Shawshank Redemption",
        "updatedAt": "2025-03-02T07:14:56.833Z",
        "userId": 1
    }
]

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE put :5173/api/movies/2 title='Shawshan Reemption' summary='Priso escape about hope.' link=https://www.imdb.com/title/tt01111 rating:=1
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 223
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:18:55 GMT
etag: W/"df-wQRYadqQ4urIgoBiv5BT4OAGanw"
x-powered-by: Express

{
    "createdAt": "2025-03-02T07:14:56.833Z",
    "link": "https://www.imdb.com/title/tt01111",
    "movieId": 2,
    "rating": 1,
    "summary": "Priso escape about hope.",
    "title": "Shawshan Reemption",
    "updatedAt": "2025-03-02T07:18:55.662Z",
    "userId": 1
}

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 420
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:19:27 GMT
etag: W/"1a4-W/X/cL5j4aPjF8pTmvAXLoMkwL4"
x-powered-by: Express

[
    {
        "createdAt": "2025-03-02T07:04:29.195Z",
        "link": "https://www.imdb.com/title/tt0075148/",
        "movieId": 1,
        "rating": 3,
        "summary": "Boxer",
        "title": "Rocky",
        "updatedAt": "2025-03-02T07:04:29.195Z",
        "userId": 1
    },
    {
        "createdAt": "2025-03-02T07:14:56.833Z",
        "link": "https://www.imdb.com/title/tt01111",
        "movieId": 2,
        "rating": 1,
        "summary": "Priso escape about hope.",
        "title": "Shawshan Reemption",
        "updatedAt": "2025-03-02T07:18:55.662Z",
        "userId": 1
    }
]

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE put :5173/api/movies/2 title='Shawshank Redemption' summary='Prison escape about hope.' link=https://www.imdb.com/title/tt0111161/ rating:=5
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 229
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:21:13 GMT
etag: W/"e5-zFM0JbbDcPtq9P6pXN/GAhnhH7E"
x-powered-by: Express

{
    "createdAt": "2025-03-02T07:14:56.833Z",
    "link": "https://www.imdb.com/title/tt0111161/",
    "movieId": 2,
    "rating": 5,
    "summary": "Prison escape about hope.",
    "title": "Shawshank Redemption",
    "updatedAt": "2025-03-02T07:21:13.307Z",
    "userId": 1
}

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 426
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:21:42 GMT
etag: W/"1aa-XeSqUoyYkEIQ7ADVYxSuAzgpkfo"
x-powered-by: Express

[
    {
        "createdAt": "2025-03-02T07:04:29.195Z",
        "link": "https://www.imdb.com/title/tt0075148/",
        "movieId": 1,
        "rating": 3,
        "summary": "Boxer",
        "title": "Rocky",
        "updatedAt": "2025-03-02T07:04:29.195Z",
        "userId": 1
    },
    {
        "createdAt": "2025-03-02T07:14:56.833Z",
        "link": "https://www.imdb.com/title/tt0111161/",
        "movieId": 2,
        "rating": 5,
        "summary": "Prison escape about hope.",
        "title": "Shawshank Redemption",
        "updatedAt": "2025-03-02T07:21:13.307Z",
        "userId": 1
    }
]

$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE delete :5173/api/movies/1
HTTP/1.1 204 No Content
Vary: Origin
connection: close
date: Sun, 02 Mar 2025 07:22:23 GMT
etag: W/"c2-5wHE2ZIyGGJckR/LFt8SLudeJRE"
x-powered-by: Express


$ http -A bearer -a eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3NDA4OTg5Mzh9.kSLF-dkaC58h4Jz5nfsPG0G86VEL0i6QaiNokMVBliE :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 231
content-type: application/json; charset=utf-8
date: Sun, 02 Mar 2025 07:22:57 GMT
etag: W/"e7-pzciB2BYD4i+aVXrCgy9lJKyK6o"
x-powered-by: Express

[
    {
        "createdAt": "2025-03-02T07:14:56.833Z",
        "link": "https://www.imdb.com/title/tt0111161/",
        "movieId": 2,
        "rating": 5,
        "summary": "Prison escape about hope.",
        "title": "Shawshank Redemption",
        "updatedAt": "2025-03-02T07:21:13.307Z",
        "userId": 1
    }
]
```
