FROM --platform=linux/amd64 openjdk:22
EXPOSE 8080
ADD backend/target/track-your-health.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]


