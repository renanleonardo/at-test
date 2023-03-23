# AT API TEST - RENAN NUNES FILHO
With Open index.html file and if browser doesn't allow to communicate with API (CORS issue) then, with PHP installed, inside this folder run `php -S localhost:8000` then go to web browser and paste this url http://localhost:8000/

## Description on how to build the product search
To build a search functionality add a text field and search button to make trigger a javascript event. For the table use bootstrap because it's easy to handle alternative colours to the rows.
Use fetch api in javascript to call the Products API url. When pressed Search, call a function and pass the value you get from the title text field and add to the title's api parameter. Due to different locations also add a button to select the country and save it in a cookie and use that to make the api request.


