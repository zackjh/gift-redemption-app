# Gift Redemption App

This is a Node.js application designed to manage the process of Christmas gift redemptions by providing a streamlined solution for managing gift redemption requests within an organisation.

This was developed as a take-home assignment for GovTech's 2024 summer internship application process.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (Node Package Manager)

This application is built using TypeScript with Express.js, so familiarity with these technologies will be beneficial.

### Installation

1. Clone the repository

   ```
   $ git clone https://github.com/zackjh/gift-redemption-app.git
   $ cd gift-redemption-app
   ```

2. Create a `.env` file

   Create a `.env` file in the root directory of the project and add the following line:

   ```
   CSV_FILE_PATH=path/to/csv/file
   ```

   Replace `path/to/csv/file` with the actual path to your CSV file containing staff ID to team mappings.

3. Install dependencies

   Run the following command to install the necessary dependencies:

   ```
   $ npm install
   ```

4. Compile TypeScript to JavaScript

   Since the application is developed using TypeScript, you'll need to compile the TypeScript files into JavaScript before running the application. You can do this by running:

   ```
   $ npx tsc
   ```

5. Start the application

   To start the application, run:

   ```
   $ npm start
   ```

   This will launch the Express server, and the application will begin listening for requests.

6. Use the application

   Navigate to [localhost:3000](http://localhost:3000) in your browser to use the application.

## Assumptions

This application was developed with the understanding that it would be used as a small or ad-hoc tool for internal use. Given this context:

- Simplicity Over Complexity: The project was kept simple to ensure ease of use, quick deployment, and straightforward maintenance. This approach supports internal users in navigating the application without the need for extensive documentation or training.

- Scalability: While currently designed for a smaller user base, the architecture allows for future expansion should the need arise.

- Environment: It's assumed the application would run in a controlled environment, which influenced decisions around security and data handling.
  Other reasonable assumptions include:

- User Authentication: Given the internal usage context, the application does not currently implement user authentication. It's assumed that access to the application is managed through other means within the organisation.

- Data Integrity: The application trusts the integrity of the CSV file input, assuming it has been validated beforehand.

## Potential Improvements

Despite the current functionality meeting the project's requirements, there are areas for growth that could enhance the application:

- More Extensive Unit Testing: As my experience with unit testing, especially within the Express.js framework, grows, test coverage could be improved upon. This would ensure robustness and reliability, particularly if the application were to scale.

- User Authentication: Introducing a simple authentication layer could further secure the application, ensuring that only authorised personnel can access and perform redemption operations.

- Dynamic Data Handling: Implementing a GUI for uploading and managing the CSV data directly within the application could streamline operations and reduce dependency on manual file management.

## Personal Note

As a university student currently in the midst of the semester, the time I dedicated to this take-home assignment was balanced with academic and extra-curricular commitments. Regardless, I endeavoured to deliver a functional and well-structured application that meets the criteria outlined in the task description.

While this application is far from perfect, I believe that it highlights my ability to develop an effective minimum viable product (MVP) in an efficient manner. The idea of 'rapid prototyping' was a mainstay throughout my time working on this application and it shows in the relatively quick turnaround time.

## Conclusion

The development process for this application was a challenging, yet enjoyable, one. The highlight (or lowlight) was discovering gaps in my knowledge of unit testing in Express.js as it made writing useful tests a struggle. Regardless, I am eager to learn and grow in all aspects of software development, and I view this internship as a pivotal opportunity to deepen my skills under the guidance of experienced professionals at GovTech.
