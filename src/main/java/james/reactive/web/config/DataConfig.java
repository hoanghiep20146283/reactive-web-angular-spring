package james.reactive.web.config;

import de.flapdoodle.embed.mongo.spring.autoconfigure.EmbeddedMongoAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoReactiveRepositoriesAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;

@Profile("local")
@Configuration
@Import({EmbeddedMongoAutoConfiguration.class, MongoReactiveRepositoriesAutoConfiguration.class})
public class DataConfig {
}
