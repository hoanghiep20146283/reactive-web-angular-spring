package com.james.interceptor;

import static com.james.constant.TracingConstant.METHOD_TRACING;
import static com.james.constant.TracingConstant.PROTOCOL_TRACING;
import static com.james.constant.TracingConstant.SERVER_TRACING;

import brave.Span;
import brave.Tracing;
import brave.propagation.TraceContext.Extractor;
import brave.propagation.TraceContextOrSamplingFlags;
import com.james.constant.TracingConstant.Protocol;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class ZipkinFilter implements WebFilter {

  private final Tracing tracing;

  @Value("${spring.application.name}")
  private String applicationName;

  @NotNull
  @Override
  public Mono<Void> filter(ServerWebExchange serverWebExchange,
    @NotNull WebFilterChain webFilterChain) {
    Extractor<ServerHttpRequest> extractor = tracing.propagation()
      .extractor((request, key) -> request.getHeaders().get(key) == null
        ? Strings.EMPTY
        : request.getHeaders().get(key).get(0));
    Span serverSpan = Optional.ofNullable(extractor.extract(serverWebExchange.getRequest()))
      .map(TraceContextOrSamplingFlags::context)
      .map(context -> {
        tracing.tracer().startScopedSpanWithParent(applicationName, context);
        return tracing.tracer().currentSpan();
      })
      .orElseGet(() -> {
        Span newSpan = tracing.tracer().newTrace().name("root");
        newSpan.tag("root", "root");
        tracing.tracer().startScopedSpanWithParent(applicationName, newSpan.context());
        return tracing.tracer().currentSpan();
      });

    serverSpan.tag(SERVER_TRACING, applicationName);
    serverSpan.tag(METHOD_TRACING, serverWebExchange.getRequest().getURI().toString());
    serverSpan.tag(PROTOCOL_TRACING, Protocol.HTTP.getValue());
    try {
      serverSpan.start();
      return webFilterChain.filter(serverWebExchange)
        .doOnError(serverSpan::error)
        .doFinally(signalType -> serverSpan.finish());
    } catch (Exception exception) {
      log.error("Error when start span: {}", serverSpan, exception);
      return Mono.error(exception);
    }
  }

}

