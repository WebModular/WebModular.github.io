# WebModular.R-independent analytical runtime, evaluated through webR.
# All mutable state belongs to this class-like environment.
WebModular <- local({
  registry <- new.env(parent=emptyenv())
  registry$history <- numeric()
  registry$batches <- 0L
  registry$total <- 0L
  registry$functions <- list(
    initialize=list(calls=0L),
    ingest=list(calls=0L, total=0L),
    statistics=list(calls=0L)
  )
  initialize <- function() {
    registry$functions$initialize$calls <- registry$functions$initialize$calls + 1L
    invisible(TRUE)
  }
  statistics <- function() {
    registry$functions$statistics$calls <- registry$functions$statistics$calls + 1L
    x <- registry$history
    if (!length(x)) return("0|0|0|0|0")
    paste(c(
      format(round(mean(x),2), scientific=FALSE),
      format(round(unname(quantile(x, 0.95)),2), scientific=FALSE),
      length(x),
      registry$total,
      registry$batches
    ), collapse="|")
  }
  ingest <- function(x=numeric()) {
    registry$functions$ingest$calls <- registry$functions$ingest$calls + 1L
    x <- as.numeric(x)
    x <- x[is.finite(x) & x >= 0 & x < 1000]
    registry$functions$ingest$total <- registry$functions$ingest$total + length(x)
    registry$total <- registry$total + length(x)
    registry$batches <- registry$batches + 1L
    if (length(x)) registry$history <- tail(c(registry$history, x), 600L)
    statistics()
  }
  structure(list(initialize=initialize, ingest=ingest,
    statistics=statistics, registry=registry), class="WebModular")
})
WebModular$initialize()
