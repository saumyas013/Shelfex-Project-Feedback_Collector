# # Stage 1: Build the Spring Boot application using Maven
# # Use a Maven image with JDK 21 as the build environment
# FROM maven:3.9.6-eclipse-temurin-21 AS build
#
# # Set the working directory inside the container
# WORKDIR /app
#
# # Copy the Maven project files (pom.xml) first to leverage Docker cache
# COPY pom.xml .
#
# # Copy the rest of the source code
# COPY src ./src
#
# # Build the Spring Boot application, skipping tests to speed up the build
# RUN mvn clean package -DskipTests
#
# # Stage 2: Create the final lightweight image
# # Use a smaller JRE-only image for the final application, based on Eclipse Temurin JDK 21
# FROM eclipse-temurin:21-jre
#
# # Set the working directory for the application inside the container
# WORKDIR /app
#
# # Copy the built JAR file from the 'build' stage into the final image
# COPY --from=build /app/target/feedback-collection-backend-1.0.0.jar app.jar
#
# # Expose the port your Spring Boot application runs on
# EXPOSE 8080
#
# # Define the command to run when the container starts
# ENTRYPOINT ["java", "-jar", "app.jar"]
