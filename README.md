# HashnodeTask

#### Problem Statement

We are trying to improve our comment editor. One of the improvements is to sync the comment with server in realtime. Right now if you visit any post and start writing a comment you will see that your comment is being synced with `localStorage`. We would like to upgrade our editor to support real time syncing with server instead of `localStorage`.

While writing the comment, everytime the user pauses you need to sync the content with backend. What’s the best way to do this? We would like to see a solution that demonstrates the best way to sync an editor’s content with the server in realtime.

#### Note:  
You need to use Node.js as the backend. For storing the comment draft please use MongoDB.
On the frontend you can use plain JavaScript or any library/framework of your choice.
Each time you sync the comment with server, make sure you submit just the delta/diff and not the whole comment (take a look at [this][this] node module).

#### Requirements

- [Node and npm](http://nodejs.org)

#### Installation

1. Clone this repository.
2. `cd HashnodeTask`
3. `npm install`
4. `bower install`
5. `npm start` or `nodemon`
6. Go to `http://localhost:8000`


[this]: https://github.com/marcelklehr/diff_match_patch
