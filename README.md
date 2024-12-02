Nawy Apartment Listing

Getting Started
Follow the steps below to set up and run the project locally using Docker.

Prerequisites
Ensure the following software is installed on your machine:

Git - Version control system
Docker - Containerization platform
Docker Compose - Tool for defining and running multi-container Docker applications

Setup Instructions
1. Clone the Repository
Run the following command to clone the project repository:

git clone https://github.com/ElLaithy7/nawy-apartment-listing.git
Navigate to the project directory:

cd your-repository
2. Build the Docker Containers
Use docker-compose to build the project:

docker-compose build
3. Start the Application
Run the application using the following command:

bash
Copy code
docker-compose up
This will start all necessary services defined in the docker-compose.yml file.

4. Access the Application
Once the services are running, open your browser and go to:

http://localhost:3000

Stopping the Application
To stop the application and its services, press Ctrl+C in the terminal and run:

docker-compose down
