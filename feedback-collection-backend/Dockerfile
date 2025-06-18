# Stage 1: Build the Spring Boot application using Maven
# Use a Maven image with JDK 17 as the build environment
FROM maven:3.8.8-openjdk-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files (pom.xml) first to leverage Docker cache
COPY pom.xml .

# Copy the rest of the source code
COPY src ./src

# Build the Spring Boot application, skipping tests to speed up the build
# This will create a JAR file in the 'target' directory
RUN mvn clean package -DskipTests

# Stage 2: Create the final lightweight image
# Use a smaller JRE-only image for the final application, based on OpenJDK 17
FROM openjdk:21-jre-slim

# Set the working directory for the application inside the container
WORKDIR /app

# Copy the built JAR file from the 'build' stage into the final image
# Replace 'feedback-backend-0.0.1-SNAPSHOT.jar' with the actual name of your generated JAR file.
# You can find the exact name in your local 'feedback-collection-backend/target/' directory after running 'mvn clean package'.
# It usually follows the pattern: <artifactId>-<version>.jar
COPY --from=build /app/target/feedback-collection-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot application runs on (as defined in application.properties/yml)
EXPOSE 8080

# Define the command to run when the container starts
# This executes your Spring Boot JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]