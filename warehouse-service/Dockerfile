# Use the official OpenJDK image as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file built by Gradle into the container
COPY build/libs/warehouse-service-0.0.1-SNAPSHOT.jar /app/app.jar

ENV SPRING_PROFILES_ACTIVE=dev
ENV KAFKA_BOOTSTRAP_SERVER=kafka:9092
ENV ZIPKIN_SERVER_URL=http://zipkin-server:9411/api/v2/spans

# Expose the port your application listens on
EXPOSE 8080
EXPOSE 8081

# Command to run the application
ENTRYPOINT java -jar -DZIPKIN_SERVER_URL=${ZIPKIN_SERVER_URL} -DKAFKA_BOOTSTRAP_SERVER=$KAFKA_BOOTSTRAP_SERVER -Dspring.profiles.active=$SPRING_PROFILES_ACTIVE /app/app.jar
