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
  implementation("org.springframework.boot:spring-boot-autoconfigure")
  implementation("org.springframework:spring-tx:5.2.19.RELEASE")
  implementation("com.zaxxer:HikariCP:5.0.0")
  implementation("mysql:mysql-connector-java:8.0.33")
  implementation("org.springframework:spring-jdbc:5.3.7")
  implementation("io.zipkin.java:zipkin-autoconfigure-storage-mysql:2.12.9")
  implementation("io.zipkin:zipkin-server:2.24.3")
  implementation("io.zipkin.zipkin2:zipkin:2.12.9")
  implementation("io.zipkin.brave:brave-instrumentation-http:5.16.0")
  implementation("io.zipkin.brave:brave-context-slf4j:5.16.0")
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
