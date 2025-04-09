# Build stage
FROM maven:3.8.4-openjdk-11 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
COPY src/main/resources/application.properties /app/config/application.properties
ENV SPRING_CONFIG_LOCATION=file:/app/config/application.properties

# Create upload directory and set permissions
RUN mkdir -p /app/uploads && \
    chmod 777 /app/uploads

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"] 