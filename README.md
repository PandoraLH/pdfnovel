# PDF Novel Repository

This repository contains a PDF novel web application built with Next.js. The application provides various features for both readers and administrators, including authentication, novel management, and user-specific functionality. The application is backed by a MongoDB database and utilizes JSON Web Tokens (JWT) for authentication.

## Features

### Authentication

The application offers multiple authentication options for users:

- **Local Authentication**: Users can create an account, log in, and manage their profile using a username and password.
- **OAuth Authentication**: Users can also choose to authenticate via Google or Facebook accounts.

### Admin Functionality

Administrators have access to additional features, allowing them to manage the novels in the repository:

- **CRUD Operations**: Admins can create, read, update, and delete novels through their admin account.

### User Functionality

Users can explore the collection of novels and perform various actions:

- **Homepage**: A visually appealing homepage showcases a carousel of featured novels and lists the newest updates.
- **Series Page**: Users can view a comprehensive list of novels, filter by criteria such as newest/oldest or A-Z/Z-A, and search by novel name, other names, or author.
- **Novel Detail Page**: Each novel has a dedicated page displaying all relevant information, including a download link.
- **Following Novels**: Logged-in users can follow novels of their interest on the Novel Detail Page.
- **Library**: Users can access their library, which lists the novels they are following and is updated with the latest additions.

## Technologies Used

The project utilizes the following technologies:

- **Next.js**: Next.js is used for both front-end and backend development. It provides server-side rendering, routing, and other helpful features.
- **Database**: The application employs MongoDB as the database to store novel and user information.

## Running the Project

To run the Next.js project, follow these steps:

1. Ensure you have Node.js and npm (Node Package Manager) installed on your machine.
2. Clone this repository to your local machine.
3. In the project directory, create a `.env` file.
4. Open the `.env` file and provide the necessary environment variables. Your .env should be like this

  .env
  MONGODB_URI = mongodb+srv://pdfnovel:ranismbirain125@cluster0.xdtjl8y.mongodb.net/pdfnovel?retryWrites=true&w=majority
  PEPPER = d18e3440dae2eacbc8e1c11b023c56d9
  JWT_SECRET = Zk2yetIBawcxtMXejL1E6LPhAg8Y10sULoAEpLgrJh1SM1s3rSM3Mhbqj5dffdPW7tgE/ru9c367r6jG6Qa1kfjJqkFDNf3ZVbhyod4ELXLqUZEIEJNtXPs2Czyyqs9DTfKnX2hNz+PTh/4gz9LFPuLwrUKa41+s3PujpHr671QMsoNP8NV+yQsbXh6tgGtkCKtPREyNwdlpRNsyVYh9mF4vcHSeCQHldBZRHAW3oUaCouxaKP1Cxkbk6zpv2wC6QpezLZI5nTnd9Q8ybATuTLtvBkvYvm4P2IAGvAtW5Bhz3WD8FWL8RDg8331URyn11mA+To98R6aGxqtBwAn5DQ==
  NEXT_DEV_URL = http://localhost:3000
  NEXT_PROD_URL = https://pdfnovel.vercel.app
  NEXT_AUTH_SECRET = NBCvkkyz/7ySRaxhiWoNf2q04s7xVVSDOFGCJc8Yco0=
  NEXTAUTH_URL = http://localhost:3000/api/auth
  GOOGLE_CLIENT_ID= 648443180499-f2jfnh4vbv6enns35bpu7iuhstlep23e.apps.googleusercontent.com
  GOOGLE_CLIENT_SECRET= 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
  FACEBOOK_CLIENT_ID= 1320568425204767
  FACEBOOK_CLIENT_SECRET= 8bd9cc2bede7482eee2793bcd39a14ac

5. Install the project dependencies by running the following command:

  npm install

6. Once the installation is complete, start the development server with the following command:

  npm run dev

7. The application should now be running locally. Access it by visiting `http://localhost:3000` in your web browser.

Please note that the `.env` file should never be committed to version control systems like Git as it may contain sensitive information. Make sure to keep it private and secure.

Enjoy exploring and managing your PDF novel repository with this Next.js application!

