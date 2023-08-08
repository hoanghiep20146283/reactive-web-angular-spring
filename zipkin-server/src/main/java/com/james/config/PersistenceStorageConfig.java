package com.james.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import zipkin2.autoconfigure.storage.mysql.TracingZipkinMySQLStorageAutoConfiguration;

@Configuration
@Import({TracingZipkinMySQLStorageAutoConfiguration.class,
  TracingZipkinMySQLStorageAutoConfiguration.class})
public class PersistenceStorageConfig {

  @Bean
  public DataSourceProperties dataSourceProperties() {
    return new DataSourceProperties();
  }
  @Bean
  public DataSource dataSourceZipkin(DataSourceProperties dataSourceProperties) {
    return dataSourceProperties.initializeDataSourceBuilder()
      .type(HikariDataSource.class).build();
  }
}
