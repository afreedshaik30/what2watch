# Use Java 21 base image
FROM eclipse-temurin:21-jdk-jammy

# Set the working directory (optional)
WORKDIR /app

# Copy the built JAR into the container
COPY target/w2w-app.jar w2w-app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "w2w-app.jar"]
