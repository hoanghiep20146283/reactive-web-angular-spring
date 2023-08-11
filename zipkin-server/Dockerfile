# Use the official OpenJDK image as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file built by Gradle into the container
COPY build/libs/zipkin-server.jar /app/app.jar
ENV ZIPKIN_MYSQL_URL=3306

# Expose the port your application listens on
EXPOSE 8080
EXPOSE 8081

# Command to run the application
ENTRYPOINT java -jar -DZIPKIN_MYSQL_URL=${ZIPKIN_MYSQL_URL} /app/app.jar
