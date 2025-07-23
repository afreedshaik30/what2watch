# -------- Stage 1: Build the application --------
FROM maven:3.9-eclipse-temurin-21 AS build

LABEL maintainer="Afreed Shaik"
WORKDIR /build

# Copy pom.xml and download dependencies
COPY ./server/pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY ./server/src ./src

# Package the application (skip tests if not needed)
RUN mvn clean package -DskipTests

# -------- Stage 2: Run the application --------
FROM eclipse-temurin:21-jdk-jammy

LABEL maintainer="Afreed Shaik"
LABEL version="1.0"
LABEL description="Spring Boot App backend using Java 21 and Aiven MySQL"

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /build/target/*.jar w2w-app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "w2w-app.jar"]
