$ http :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 2
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:17:13 GMT
etag: W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"
x-powered-by: Express

[]

$ http post :5173/api/movies title=Rocky summary=Boxer link=https://www.imdb.com/title/tt0075148/ rating:=3
HTTP/1.1 201 Created
Vary: Origin
connection: close
content-length: 183
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:18:56 GMT
etag: W/"b7-UXc7sfVLI2+A4//qljT5qAXr/ps"
x-powered-by: Express

{
    "createdAt": "2025-02-21T23:18:56.701Z",
    "link": "https://www.imdb.com/title/tt0075148/",
    "movieId": 1,
    "rating": 3,
    "summary": "Boxer",
    "title": "Rocky",
    "updatedAt": "2025-02-21T23:18:56.701Z"
}

$ http :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 185
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:19:03 GMT
etag: W/"b9-tKBVxjZdURL5nW8J12Xu2JVl2EE"
x-powered-by: Express

[
    {
        "createdAt": "2025-02-21T23:18:56.701Z",
        "link": "https://www.imdb.com/title/tt0075148/",
        "movieId": 1,
        "rating": 3,
        "summary": "Boxer",
        "title": "Rocky",
        "updatedAt": "2025-02-21T23:18:56.701Z"
    }
]

$ http post :5173/api/movies title='Shawshank Redemption' summary='Prison escape about hope.' link=https://www.imdb.com/title/tt0111161/ rating:=5
HTTP/1.1 201 Created
Vary: Origin
connection: close
content-length: 218
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:21:55 GMT
etag: W/"da-4TsVvzJ1g9UpWsq8ITiCmzejNGw"
x-powered-by: Express

{
    "createdAt": "2025-02-21T23:21:55.822Z",
    "link": "https://www.imdb.com/title/tt0111161/",
    "movieId": 2,
    "rating": 5,
    "summary": "Prison escape about hope.",
    "title": "Shawshank Redemption",
    "updatedAt": "2025-02-21T23:21:55.822Z"
}

$ http :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 404
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:22:02 GMT
etag: W/"194-ci+QyDKhotaoG8EKRcj+4R8OSZY"
x-powered-by: Express

[
    {
        "createdAt": "2025-02-21T23:18:56.701Z",
        "link": "https://www.imdb.com/title/tt0075148/",
        "movieId": 1,
        "rating": 3,
        "summary": "Boxer",
        "title": "Rocky",
        "updatedAt": "2025-02-21T23:18:56.701Z"
    },
    {
        "createdAt": "2025-02-21T23:21:55.822Z",
        "link": "https://www.imdb.com/title/tt0111161/",
        "movieId": 2,
        "rating": 5,
        "summary": "Prison escape about hope.",
        "title": "Shawshank Redemption",
        "updatedAt": "2025-02-21T23:21:55.822Z"
    }
]

$ http put :5173/api/movies/2 title='Shawshan Reemption' summary='Priso escape about hope.' link=https://www.imdb.com/title/tt01111 rating:=1
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 212
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:24:42 GMT
etag: W/"d4-Cw/jazpbK5gd9cUyn3Fy+28bt/c"
x-powered-by: Express

{
    "createdAt": "2025-02-21T23:21:55.822Z",
    "link": "https://www.imdb.com/title/tt01111",
    "movieId": 2,
    "rating": 1,
    "summary": "Priso escape about hope.",
    "title": "Shawshan Reemption",
    "updatedAt": "2025-02-21T23:24:42.804Z"
}

$ http :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 398
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:25:19 GMT
etag: W/"18e-8Y7iqK2HyVTWsFVOeAzgvJVspVA"
x-powered-by: Express

[
    {
        "createdAt": "2025-02-21T23:18:56.701Z",
        "link": "https://www.imdb.com/title/tt0075148/",
        "movieId": 1,
        "rating": 3,
        "summary": "Boxer",
        "title": "Rocky",
        "updatedAt": "2025-02-21T23:18:56.701Z"
    },
    {
        "createdAt": "2025-02-21T23:21:55.822Z",
        "link": "https://www.imdb.com/title/tt01111",
        "movieId": 2,
        "rating": 1,
        "summary": "Priso escape about hope.",
        "title": "Shawshan Reemption",
        "updatedAt": "2025-02-21T23:24:42.804Z"
    }
]

$ http put :5173/api/movies/2 title='Shawshank Redemption' summary='Prison escape about hope.' link=https://www.imdb.com/title/tt0111161/ rating:=5
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 218
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:25:47 GMT
etag: W/"da-qC0kG9nxMCRrGBsow5JQYF7wdaI"
x-powered-by: Express

{
    "createdAt": "2025-02-21T23:21:55.822Z",
    "link": "https://www.imdb.com/title/tt0111161/",
    "movieId": 2,
    "rating": 5,
    "summary": "Prison escape about hope.",
    "title": "Shawshank Redemption",
    "updatedAt": "2025-02-21T23:25:47.269Z"
}

$ http :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 404
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:25:50 GMT
etag: W/"194-asrcegf5MlcQ3MD9h0T00wBrfsA"
x-powered-by: Express

[
    {
        "createdAt": "2025-02-21T23:18:56.701Z",
        "link": "https://www.imdb.com/title/tt0075148/",
        "movieId": 1,
        "rating": 3,
        "summary": "Boxer",
        "title": "Rocky",
        "updatedAt": "2025-02-21T23:18:56.701Z"
    },
    {
        "createdAt": "2025-02-21T23:21:55.822Z",
        "link": "https://www.imdb.com/title/tt0111161/",
        "movieId": 2,
        "rating": 5,
        "summary": "Prison escape about hope.",
        "title": "Shawshank Redemption",
        "updatedAt": "2025-02-21T23:25:47.269Z"
    }
]

$ http delete :5173/api/movies/1
HTTP/1.1 204 No Content
Vary: Origin
connection: close
date: Fri, 21 Feb 2025 23:29:00 GMT
etag: W/"b7-UXc7sfVLI2+A4//qljT5qAXr/ps"
x-powered-by: Express


$ http :5173/api/movies
HTTP/1.1 200 OK
Vary: Origin
connection: close
content-length: 220
content-type: application/json; charset=utf-8
date: Fri, 21 Feb 2025 23:29:05 GMT
etag: W/"dc-LvtLuLhVENMbUmKZQLycDUb/4I0"
x-powered-by: Express

[
    {
        "createdAt": "2025-02-21T23:21:55.822Z",
        "link": "https://www.imdb.com/title/tt0111161/",
        "movieId": 2,
        "rating": 5,
        "summary": "Prison escape about hope.",
        "title": "Shawshank Redemption",
        "updatedAt": "2025-02-21T23:25:47.269Z"
    }
]
