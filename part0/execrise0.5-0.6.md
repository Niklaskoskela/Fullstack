title SPA 0.5 and 0.6

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
Server->Browser: HTTP Code

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server->Browser: main.css

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server->Browser: main.js

note over Browser:
browser executes js and requests from server:
end note

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->Browser: [{ Object { content: "2", date: "2022-07-13T04:12:31.152Z" }...]

note right of Browser
Here is 0.6 - saving a note on spa:
end note

Browser->Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

