package com.james.config;

import brave.Tracing;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import zipkin2.Span;
import zipkin2.reporter.AsyncReporter;
import zipkin2.reporter.Reporter;
import zipkin2.reporter.Sender;
import zipkin2.reporter.okhttp3.OkHttpSender;

@Configuration
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnProperty(value = "zipkin.enabled", havingValue = "true")
public class ZipkinAutoConfiguration {

  @Value("${zipkin.server.url:http://127.0.0.1:9411/api/v2/spans}")
  private String zipkinServerUrl;

  @Value("${spring.application.name:UNKNOWN}")
  private String applicationName;

  @Bean
  public Sender sender() {
    return OkHttpSender.newBuilder().endpoint(zipkinServerUrl).build();
  }

  @Bean
  public Tracing tracing(Reporter<Span> reporter) {
    return Tracing.newBuilder().localServiceName(applicationName).spanReporter(reporter).build();
  }

  @Bean
  public Reporter<Span> asyncReporter(Sender sender) {
    return AsyncReporter.create(sender);
  }
}
