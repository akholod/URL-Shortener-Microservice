# URL-Shortener-Microservice

User stories:

    - I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
    - If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
    - When I visit that shortened URL, it will redirect me to my original link.
    
Example usage:
    https://ms-url-short.herokuapp.com/new/https://twitter.com/ https://ms-url-short.herokuapp.com/new/http://nodeschool.io/
Example output:
    {"original_url":"https://twitter.com/","short_url":"http://ms-url-short.herokuapp.com/113"}
Usage:
    "http://ms-url-short.herokuapp.com/113"
Will redirect you to:
    https://twitter.com/
