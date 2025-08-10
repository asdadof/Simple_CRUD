This project is a very simple CRUD application for managing posts, built with Next.js and TypeScript. The goal was to create a clean, minimal interface that allows users to create, read, update, and delete posts with validation and state management, while also considering some of the bonus features like sorting options, filtering, and the use of tailwind. 

I then added some extra functionality, like adding a backend and a database enabling persistency over reload of the webpage, but also the server, and phone compatibility, RWD (Responsive Web Design).  

## Getting Started

First, install the required packages:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

## Usage

  - Open [http://localhost:3000](http://localhost:3000) in you web browser.  
  - Use the "Add Post" button to create a new post.
  - Edit or delete existing posts using the respective buttons.
  - All posts are displayed on the main page, with sorting and filtering options if implemented.


## Project Structure (/src/)

    /app – Next.js pages, api and database initializer

        /api 

            /messages

                /route.ts (Handles GET and POST)
  
                /[id]

                    /route.ts (Handles PATCH and DELETE)

    /components –  React components

        /functionBar - Components related to the functionbar (New message, search, sorting)
        
    /functions – Non-component functions
