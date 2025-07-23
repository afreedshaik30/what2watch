# -------- Stage 1: Build the application --------
FROM maven:3.9-eclipse-temurin-21 AS build

LABEL maintainer="Afreed Shaik"
WORKDIR /build

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# -------- Stage 2: Run the application --------
FROM eclipse-temurin:21-jdk-jammy

LABEL maintainer="Afreed Shaik"
LABEL version="1.0"
LABEL description="Spring Boot App backend using Java 21 and Aiven MySQL"

WORKDIR /app
COPY --from=build /build/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
