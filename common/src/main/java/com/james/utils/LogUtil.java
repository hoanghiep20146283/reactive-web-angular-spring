package com.james.utils;

import java.util.Optional;
import java.util.function.Consumer;
import org.slf4j.MDC;
import reactor.core.publisher.Signal;
import reactor.core.publisher.SignalType;

import static com.james.constant.TracingConstant.MDC_SPAN_ID;
import static com.james.constant.TracingConstant.MDC_TRACE_ID;

public class LogUtil {

  public static <T> Consumer<Signal<T>> logFinally(Consumer<SignalType> onFinally) {
    return signal -> {
      if (!signal.isOnComplete()) {
        return;
      }
      Optional<Long> spanIdOption = signal.getContextView().getOrEmpty(MDC_SPAN_ID);

      spanIdOption.ifPresentOrElse(spanId -> {
          try (MDC.MDCCloseable spanMdc = MDC.putCloseable(MDC_SPAN_ID,
            spanId.toString()); MDC.MDCCloseable traceMdc = MDC.putCloseable(MDC_TRACE_ID,
            spanId.toString())) {
            onFinally.accept(signal.getType());
          }
        },
        () -> onFinally.accept(signal.getType()));
    };
  }

  public static <T> Consumer<Signal<T>> logOnNext(Consumer<T> logStatement) {
    return signal -> {
      if (!signal.isOnNext()) {
        return;
      }
      Optional<Long> spanIdOption = signal.getContextView().getOrEmpty(MDC_SPAN_ID);
      Optional<Long> traceIdOption = signal.getContextView().getOrEmpty(MDC_TRACE_ID);

      if (spanIdOption.isEmpty() || traceIdOption.isEmpty()) {
        logStatement.accept(signal.get());
      } else {
        try (MDC.MDCCloseable spanMdc = MDC.putCloseable(MDC_SPAN_ID,
          spanIdOption.get().toString());
          MDC.MDCCloseable traceMdc = MDC.putCloseable(MDC_TRACE_ID,
            traceIdOption.get().toString())) {
          logStatement.accept(signal.get());
        }
      }
    };
  }

  public static Consumer<Signal<?>> logOnError(Consumer<Throwable> errorLogStatement) {
    return signal -> {
      if (!signal.isOnError()) {
        return;
      }
      Optional<Long> spanIdOption = signal.getContextView().getOrEmpty(MDC_SPAN_ID);

      spanIdOption.ifPresentOrElse(spanId -> {
          try (MDC.MDCCloseable spanMdc = MDC.putCloseable(MDC_SPAN_ID,
            spanId.toString()); MDC.MDCCloseable traceMdc = MDC.putCloseable(MDC_TRACE_ID,
            spanId.toString())) {
            errorLogStatement.accept(signal.getThrowable());
          }
        },
        () -> errorLogStatement.accept(signal.getThrowable()));
    };
  }
}
