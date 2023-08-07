plugins {
  id("java")
  id("org.springframework.boot") version "3.1.2"
}

group = "com.james"

repositories {
  mavenCentral()
}

java {
  toolchain {
    languageVersion = JavaLanguageVersion.of(11)
  }
}

dependencies {
  implementation("io.zipkin.java:zipkin-server:2.12.9")
  implementation("io.zipkin.java:zipkin-autoconfigure-ui:2.12.9")
  implementation("org.springframework.boot:spring-boot-starter-actuator:2.0.1.RELEASE")
}

configurations {
  all {
    exclude("org.springframework.boot:spring-boot-starter-logging")
    exclude("org.apache.logging.log4j")
  }
}

tasks.test {
  useJUnitPlatform()
}
