FROM openjdk:16-jdk-alpine

COPY . /usr/src/pwebbackend

WORKDIR /usr/src/pwebbackend

RUN apk upgrade --update \
	&& apk add -U tzdata \
	&& cp /usr/share/zoneinfo/Europe/Bucharest /etc/localtime

CMD ["java", "-Xms256M", "-Xmx512M", "-jar", "./target/spring-boot-boilerplate.jar"]