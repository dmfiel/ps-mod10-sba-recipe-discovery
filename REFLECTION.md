• The most challenging part of the project for you.

The most difficult part of the project turned out to be saving favorites in local storage, even though I had used it many times before. I thought it would be interesting to use a set in order to save the favorites, which was a fair challenge due to all the typing necessary. But then, after too much experimentation, I learned that JSON.stringify turns a set into an empty object. I was able to find a workaround that allowed a Set to be converted in order to save it into local storage. But then it was saved as an array, which would have required another hack to convert it back into a Set upon retrieval. So, instead I changed it all to use an array for favorites.

• A brief explanation of a design decision you made (e.g., why you structured a hook a certain way, how you decided to manage a piece of state).

The favorites context with its associated functions and local storage was the most interesting design decision as documented above.
