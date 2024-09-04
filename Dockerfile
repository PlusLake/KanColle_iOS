FROM eclipse-temurin:21.0.4_7-jdk

COPY Server.java /home/Server.java
COPY lib /home/lib
WORKDIR /home/
CMD ["java", "-cp", "lib/*", "Server.java"]
