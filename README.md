# Event Booker

## Table of Contents
### [Description](#description)
### [Technologies](#technologies)
### [Features](#features)
### [Installation](#installation)
### [Usage](#usage)
### [Deployment](#deployment)
### [Contributors](#contributors)
### [Tests](#tests)
### [Questions](#questions)
### [License](#license)

## Description

Event Booker is a comprehensive platform for event organizers, promoters, and managers. It simplifies the process of creating, promoting, and managing events of any type and size.

## Technologies

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- Handlebars.js
- Express-session & Cookies (Authentication)
- Heroku (Deployment)
- HTML, CSS, Tailwind CSS

## Features

- **Event Creation**: Easily create and customize events with detailed information.
- **Ticketing System**: Manage ticket prices, availability, and bookings.
- **Shareable Links**: Generate shareable links for events to enhance promotion.
- **User Authentication**: Secure user authentication and session management.
- **Event Deletion**: Easily delete events through a streamlined process.

## Installation

 1. Clone the repository
 2. Install dependencies: 
        npm install
 3. Set up environment variables:
        Create a `.env` file in the root directory with the following variables:

        ```env
        DB_NAME=your_database_name
        DB_USER=your_database_username
        DB_PASSWORD=your_database_password
        JAWSDB_URL=your_production_database_url (if applicable)
        ```

 4. In the terminal, log in to MySQL and use Schema.sql as Source:
       - Login: mysql -u root -p
       - source db/schema.sql
 6. Run the application:
        npm start

## Usage

- Log in to start creating and managing events.
- Customize event details, ticket prices, and availability.
- Share events through generated shareable links.
- Delete events when needed.

## Deployment
This application is deployed using Heroku and can be accessed at [Event Booker](https://event-booker-083b94e1c61a.herokuapp.com/).

## Contributors

- Mostafa elgazayrli ([GitHub](https://github.com/mostafaelgazayrli))

## Tests
N/A

## Questions
Feel free to reach out with any questions, feedback, or contact the contributor directly:

- Moustafa Elgazayrli   (elganes25@gmail.com)

## License

This project is licensed under the [MIT License](LICENSE).