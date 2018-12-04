<h1 style="font-weight: bold">ReactShell</h1>

<h2 style="font-weight: bold">The Information Dashboard</h2>

<h3>ReactShell is a new product offering that you have been tasked with building. It's a dashboard for people to use to organize their daily tasks, events, news article, friends, and chat messages.</h3>

<h2 style="font-weight: bold;"> Technologies Used
<h3>Development Languages and Libraries</h3>

<img src="./public/images/node.jpg"/>______<img src="./public/images/js.jpg"/>______<img src="./public/images/bulma.png"/>______<img src="./public/images/react.png"/>______<img src="./public/images/beautiful-dnd.png"/>______<img src="./public/images/react-confirm-alert.png"/>______<img src="./public/images/jQuery.jpg"/>______<img src="./public/images/moment.jpg"/>______<img src="./public/images/rest.png"/>______<img src="./public/images/html5.jpg"/>______<img src="./public/images/css3.jpg"/>

<h1></h1>
<h3>Development Tools</h3>

<img src="./public/images/eslint.png"/>______<img src="./public/images/babel.jpg"/>______<img src="./public/images/vs.jpg"/>______<img src="./public/images/lucid.png"/>______<img src="./public/images/github.jpg"/>______<img src="./public/images/slack.jpg"/>


<h2>Instructions for Installing Mission Control</h2>

<h4> You will need to have command line tools installed for your computer to use terminal commands.
</h4>

  * Mac users - Open your terminal and type

    ```sh
    git --version
    ```

  * Linux/Windows users, please vist the [Git page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and follow the instructions for setup

<h4>You will now need to configure your git account. In the terminal window, type</h4>

  ```sh
  git config –global user.name “You Name”
  git config –global user.email “Your Email”
  ```

#### Create a new directory to store the files in. Type this into your terminal window.

  ```sh
  mkdir reactShell
  cd reactShell
  git clone git@github.com:nss-mission-control/reactshell.git
  ```

#### If you do not have Node.js installed on your machine, visit the [Node.js Download Page](https://nodejs.org/en/download/) and follow the included instructions. To ensure that it is installed correctly, in your terminal window, type

```sh
echo $PATH
```
  * Ensure that the result has the following in the $PATH

    ```sh
    /usr/local/bin
    ```
    or
    ```sh
    /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
    ```

#### You will need to go into the lib folder in your  directory and install and build npm modules and also your json-server. In your terminal, type

```sh
cd reactShell/src/lib
npm init
npm i
sudo npm install -g json-server
```

#### Now create a new directory inside the nutshell directory to store your JSON data. Type

```sh
cd ../..
mkdir api
touch api/database.json
```


#### In order to create and edit the require JSON file, you will need a text editor. For this project, we used VS Code. Visit [VS Code](https://code.visualstudio.com) to install a copy.

#### Once you have a text editor installed, open the database.json file and paste the following test data.

```json
{
  "users": [
    {
      "id": 1,
      "firstName": "Kelly",
      "lastName": "Morin",
      "username": "kmorin06",
      "password": "1234NSS",
      "email": "kmorin06@gmail.com",
      "profilePic": "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/14100479_10157231480525062_191282433024935032_n.jpg?_nc_cat=102&_nc_ht=scontent-atl3-1.xx&oh=8ecc7dd157438c9c3d09c5c910ff4c61&oe=5C6FC0EA"
    },
    {
      "id": 2,
      "firstName": "Jase",
      "lastName": "Hackman",
      "username": "JaseTheGreat",
      "password": "MusicMan",
      "email": "jaseH@gmail.com",
      "profilePic": "https://avatars1.githubusercontent.com/u/42299515?s=400&v=4"
    },
    {
      "id": 3,
      "firstName": "Brendan",
      "lastName": " McCray",
      "username": "Brendan",
      "password": "CodeWhiz",
      "email": "brendanMc@gmail.com",
      "profilePic": "https://avatars0.githubusercontent.com/u/43763999?s=400&v=4"
    },
    {
      "id": 4,
      "firstName": "Brad",
      "lastName": "Davis",
      "username": "braddavistech",
      "password": "12345NSS",
      "email": "brad@braddavistech.com",
      "profilePic": "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/35884762_10211693141659337_7630947963367325696_n.jpg?_nc_cat=103&_nc_ht=scontent-atl3-1.xx&oh=ffc0c07db4711096066f9a4612ebff3c&oe=5C7CD0B2"
    },
    {
      "id": 5,
      "firstName": "Donald",
      "lastName": "Trump",
      "username": "Love My Hair",
      "password": "12345NSS",
      "email": "trump@trump.com",
      "profilePic": "data:image/jpeg;base64,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"
    },
    {
      "id": 6,
      "firstName": "Mike",
      "lastName": "Tyson",
      "username": "Still Hungry",
      "password": "12345NSS",
      "email": "mike@littleMikey.com",
      "profilePic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBN2BB7Jk3VpInKi7R-ylNVUSDThjy77ESQD6lCk1G5j83TQwB"
    },
    {
      "id": 7,
      "firstName": "June",
      "lastName": "Shannon",
      "username": "Not My Baby",
      "password": "12345NSS",
      "email": "not@hottonot.com",
      "profilePic": "https://66.media.tumblr.com/avatar_559f50fa0023_128.pnj"
    },
    {
      "id": 8,
      "firstName": "Bob",
      "lastName": "Ross",
      "username": "Happy Trees",
      "password": "12345NSS",
      "email": "trees@treesdoplease.com",
      "profilePic": "data:image/jpeg;base64,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"
    }
  ],
  "messages": [
    {
      "id": 1,
      "messageContent": "Hi, first message.",
      "timeStamp": "2018-11-08T14:07:21.489Z",
      "userId": 1
    },
    {
      "id": 2,
      "messageContent": "I changed the message.",
      "timeStamp": "2018-11-09T12:10:34.489Z",
      "userId": 3
    },
    {
      "id": 3,
      "messageContent": "You get the idea.",
      "timeStamp": "2018-11-07T21:16:34.489Z",
      "userId": 2
    },
    {
      "messageContent": "This makes a better message",
      "timeStamp": "2018-11-10T09:16:34.489Z",
      "userId": 4,
      "id": 4
    }
  ],
   "articles": [
    {
      "articleName": "Tearful Elon Musk Warns About Dangers Of AI After Having Heart Broken By Beautiful Robotrix",
      "url": "https://www.theonion.com/tearful-elon-musk-warns-about-dangers-of-ai-after-havin-1822192554",
      "articleImage": "https://i.kinja-img.com/gawker-media/image/upload/s--CJvX7MgP--/c_scale,f_auto,fl_progressive,q_80,w_800/tizlx79ig3cluhdkvwuh.jpg",
      "dateSaved": "2018-11-14T21:18:52.339Z",
      "about": "It was named Mark Zuckerberg",
      "userId": 2,
      "id": 1
    },
    {
      "articleName": "Astronomers Confirm Moon Will Have Dozens Of New Phases In 2019",
      "url": "https://www.theonion.com/astronomers-confirm-moon-will-have-dozens-of-new-phases-1830339439",
      "articleImage": "https://i.kinja-img.com/gawker-media/image/upload/s---K0s5FLo--/c_scale,f_auto,fl_progressive,q_80,w_800/chmtxbc2yw9jzlv1bpxu.jpg",
      "dateSaved": "2018-11-09T21:18:52.339Z",
      "about": "Cheese phase activate",
      "userId": 3,
      "id": 2
    },
    {
      "articleName": "Astronomers Confirm Moon Will Have Dozens Of New Phases In 2019",
      "url": "https://www.trtworld.com/americas/five-things-you-need-to-know-about-trump-s-space-force-21667",
      "articleImage": "data:image/jpeg;base64,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",
      "dateSaved": "2018-11-14T21:18:52.339Z",
      "about": "The sun is bright",
      "userId": 1,
      "id": 3
    },
    {
      "articleName": "Scammers impersonate Elon Musk on Twitter, hack Target in bitcoin fraud",
      "url": "https://www.usatoday.com/story/money/2018/11/13/twitter-bitcoin-scam-elon-musk-target/1986017002/",
      "articleImage": "https://www.gannett-cdn.com/-mm-/a890a0b221257bbeacdf114031d88c89afd4f7cf/c=32-0-548-387/local/-/media/2018/10/27/USATODAY/usatsports/bitcoin-gettyimages-880534636_large.jpg?width=534&height=401&fit=crop",
      "dateSaved": "2018-11-13T21:18:52.339Z",
      "about": "Bitcoin is at an all time HIGH! LOW! HIGH! LOW! HIGH!",
      "userId": 4,
      "id": 4
    }
   ],
   "events": [
    {
      "id": 1,
      "name": "Fancy",
      "date": "2014-09-09",
      "location": "Here",
      "time": "03:02",
      "userId": 2
    },
    {
      "name": "Soccer Practice Today",
      "date": "2018-11-02",
      "time": "22:11",
      "location": "The Field",
      "userId": 2,
      "id": 2
    },
    {
      "name": "Sleep",
      "date": "2018-11-15",
      "time": "10:15",
      "location": "My Bed",
      "userId": 3,
      "id": 3
    },
    {
      "name": "Class",
      "date": "2018-11-12",
      "time": "09:05",
      "location": "NSS",
      "userId": 1,
      "id": 4
    }
   ],
   "tasks": [
    {
      "task": "Homework",
      "complete": true,
      "dueDate": "2018-11-12",
      "userId": 2,
      "id": 1,
      "columnId": 1
    },
    {
      "task": "Finish MVP",
      "complete": true,
      "dueDate": "2018-11-11",
      "userId": 4,
      "id": 2,
      "columnId": 2
    },
    {
      "task": "Plan project",
      "complete": true,
      "dueDate": "2018-11-09",
      "userId": 2,
      "id": 3,
      "columnId": 3
    }
   ],
  "friends": [
    {
      "id": 3,
      "request_userId": 3,
      "userId": 2
    },
    {
      "request_userId": 1,
      "userId": 3,
      "id": 4
    },
    {
      "request_userId": 1,
      "userId": 2,
      "id": 5
    },
    {
      "request_userId": 2,
      "userId": 3,
      "id": 6
    },
    {
      "request_userId": 2,
      "userId": 1,
      "id": 7
    },
    {
      "request_userId": 2,
      "userId": 2,
      "id": 8
    }
  ],
  "columns": [
    {
      "name": "Upcoming",
      "id": 1,
      "columnTasks": [
        1
      ]
    },
    {
      "name": "InProgress",
      "id": 2,
      "columnTasks": [
        2
      ]
    },
    {
      "name": "Completed",
      "id": 3,
      "columnTasks": [
        3
      ]
    }
  ],
  "column_order": {
    "columnId": [
      1,
      2,
      3
    ]
  }
}
```

#### From your terminal window, type

```sh
cd reactShell/api
json-server -p 8088 database.json
```

#### From your terminal window, type Command T, then in the new tab type

```sh
cd reactShell
npm start
```
#### Now that the server is up and running, you can open an internet browser and access the application:
```sh
http://localhost:8080/
```

#### The database can be accessed by entering the following in the url bar.

```sh
http://localhost:8088/
```

<h1 style="text-align:center; font-weight: bold;">Congratulations! You are now experiencing ReactShell!

<h2 style="font-weight:bold;text-align:center" > Topics Covered Building Mission Control</h2>

<h2 style="text-align: center">We covered numerous topics in the execution of this project which include:</h2>

1. Functions
1. Stand-Up meetings
1. ERD Diagrams
1. React
1. State-management
1. Databases/API
1. Github
1. Objects
1. CSS
1. Handling user events
1. Factory functions
1. Data entry/editing
1. Modular code with Browserify
1. Relational data


<h2 style="text-align: center">Entity Relationship Diagrams</h2>

<img src="./public/images/MissionControlERD.png" />

<h2 style="font-weight:bold;text-align: center"> Professional Requirements</h2>

1. All teams must manage their navigation through state
1. The README for your project should include instructions on how another person can download and run the application

<h2 style="font-weight:bold;text-align: center">How to Handle Authentication</h2>

Session storage was used to store the current user at login and makeAPI calls in relation to the value stored. Only the userId is saved to sessonStorage.

```js
sessionStorage.setItem("id", userId);
```

If you want to add a Logout feature, all you need to do it remove the session storage item.

```js
sessionStorage.removeItem("id");
```

<h2 style="text-align: center; font-weight: bold"> Visual Feature List</h2>

<h3 style="text-align: center">To help you along, here is a visualization of the features, and behaviors of the application to get you started.</h3>

____________________________![](./public/gif/reactShell.gif)____________________________