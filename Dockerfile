# Use the official OpenJDK image as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file built by Gradle into the container
COPY build/libs/web-0.0.1-SNAPSHOT.jar /app/app.jar

ENV SPRING_PROFILES_ACTIVE=dev
ENV MONGO_PORT=27017

# Expose the port your application listens on
EXPOSE 8080
EXPOSE 8081

# Command to run the application
ENTRYPOINT java -DMONGO_PORT=$MONGO_PORT -Dspring.profiles.active=$SPRING_PROFILES_ACTIVE jar /app/app.jar
