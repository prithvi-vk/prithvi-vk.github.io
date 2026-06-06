---
layout: post
title: "Meet Kronos: Open-Source AI for Financial Chart Forecasting"
date: 2026-06-07
description: "Seven researchers at Tsinghua University trained a foundation model on 12 billion candlesticks from 45 exchanges, open sourced it under MIT, and watched it pass 28,000 GitHub stars. It is called Kronos. Here is what it actually is, what it actually claims (the viral version gets this wrong), and what it looks like to run one yourself, all day, every day."
keywords: "Kronos, financial foundation model, K-line forecasting, candlestick prediction, Tsinghua University, time series foundation model, open source quant, AAAI 2026, BTC USDT forecast, yfinance, shiyu-coder, generative finance model, volatility forecasting"
---

Every industry with a billion-dollar moat eventually meets the person willing to give the moat away for free. Photoshop met GIMP. Now market forecasting, the proprietary heart of every quant desk on the planet, has met **Kronos**.

Kronos is a foundation model that reads candlestick charts the way a language model reads text. A research team open sourced it, it is sitting at **28,000+ GitHub stars**, and the weights run on a laptop. That last part is the disruptive bit. The *kind* of capability that trading firms treat as a closely guarded edge is now a public `git clone`.

There is a viral version of this story going around that gets the facts wrong in the exciting direction. So let us do the accurate one. It is more interesting anyway.

👉 **The model: [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos)** · **The paper: [arXiv 2508.02739](https://arxiv.org/abs/2508.02739)**

---

## What Kronos actually is

Most "AI predicts stocks" projects are a linear regression in a trench coat. Kronos is a genuine **foundation model for candlesticks**, and a properly credentialed one. It comes from seven authors at **Tsinghua University** (Yu Shi, Zongliang Fu, Shuo Chen, Bohan Zhao, Wei Xu, Changshui Zhang, and Jian Li), and the paper was accepted to **AAAI 2026**. This is not a weekend repo. It is peer-reviewed research that happens to ship working weights.

The idea borrows directly from large language models. An LLM learns the statistics of language by reading a trillion words. Kronos learns the statistics of *markets* by reading a corpus of price history, and the architecture mirrors that ambition in two stages:

1. A specialised **tokenizer** that quantises continuous, multi-dimensional K-line data (open, high, low, close, volume) into **hierarchical discrete tokens**. In plain terms, it turns the raw squiggle of a chart into a vocabulary of market "words."
2. A large, autoregressive **transformer** (the same decoder-only design behind GPT) pre-trained on those tokens to predict what comes next, one token at a time.

Here is the detail that earns the "foundation model" badge rather than "a model someone fit to Apple stock": it was pre-trained on **over 12 billion K-line records from 45 global exchanges**. Financial data is also notoriously brutal to model, far noisier than language, which is exactly why general-purpose time-series models have historically struggled here. Kronos was purpose-built for that noise, and the released family scales to fit your hardware:

| Variant | Parameters | Context | Runs on |
|---|---|---|---|
| Kronos-mini | 4.1M | 2048 | A phone, practically |
| Kronos-small | 24.7M | 512 | Any laptop |
| Kronos-base | 102.3M | 512 | A laptop, slower |
| Kronos-large | 499.2M | 512 | A real GPU |

Everything except the large is MIT licensed and one `from_pretrained()` away on Hugging Face.

---

## It does more than draw a line

The part most coverage misses: forecasting the next prices is only one of three things Kronos was built to do. As a unified model it also handles **volatility forecasting** (how violently a price is likely to swing, which is the input that actually prices options) and **synthetic data generation** (fabricating realistic but fake market history, useful for stress-testing strategies without overfitting to the one real past we got). One pre-trained brain, three jobs, and it does them **zero-shot**, meaning it forecasts assets it never saw in training without any fine-tuning. That generality is the whole pitch of a foundation model, and it is the thing a bespoke per-stock model can never give you.

---

## What it actually claims (and what it does not)

This is where the internet ran ahead of the paper. You may have seen carousels claiming Kronos "beat every model Wall Street built," or that someone "leaked Wall Street's billion-dollar AI." Both are false, and the real numbers do not need the embellishment.

Here is what the paper actually reports, in a zero-shot setting:

* **+93%** improvement in forecasting RankIC over the leading time-series foundation model
* **+87%** over the best non-pre-trained baseline
* **9%** lower error on volatility forecasting
* **22%** better fidelity when generating synthetic candlestick data

Read the comparison carefully. Kronos is benchmarked against **other AI forecasting models**, the academic time-series baselines, not against the proprietary trading systems inside Citadel or Two Sigma. Nobody leaked anything. Nothing was lifted off a trading floor. It is open research, openly published, and the honest headline is plenty strong on its own: a new open foundation model beats the previous open baselines by a wide margin. It just is not a heist movie. (RankIC, if you are wondering, measures how well the *rank* of predicted returns matches reality, which is what actually matters when you are sorting stocks rather than guessing exact prices.)

---

## What it looks like to run

The library hides the messy parts (normalisation, tokenising, sampling) behind a small predictor you hand history to. I pulled three years of daily Apple bars, fed it the last 400, and asked for the next 30 trading days:

![A two-panel chart. Top panel: AAPL closing price in black climbing to about $310, then a red forecast line bending downward into the $250s. Bottom panel: trading volume history in black with a red forecast continuation.](/assets/img/kronos-aapl-chart.png)
*History in black, Kronos' 30-day forecast in red. One important catch: Kronos is **generative**, so each forecast is a sampled path, not a fixed prediction. Re-run it and the line changes. Treat it as a suggestion of shape, not a price target.*

That single red line is actually the honest weakness and the clever fix in one picture. Because the model samples, one run is just one possible future. The right way to use it is to sample *many* futures and look at the spread, which is exactly what the authors do in production.

---

## Running it always on

A model on your laptop is a toy you have to babysit. The interesting version runs by itself, around the clock, and the Kronos authors ship a perfect example of it: a [live demo](https://shiyu-coder.github.io/Kronos-demo/) that forecasts **BTC/USDT for the next 24 hours**, refreshed continuously. It feeds Kronos-mini the last 360 hours of hourly Binance candles, runs **30 Monte Carlo sample paths**, and reports not a single number but a distribution: an upside probability, a volatility-amplification probability, and a shaded uncertainty band around the mean. That is forecasting done responsibly, probabilities instead of false precision.

You can stand up the same idea yourself. To prove how short the distance is from "research paper" to "thing in your pocket," I wrapped the model in a small Telegram bot. You text it a ticker, it texts back a chart:

![A Telegram chat. The user sent "AAPL"; the bot replied with the Kronos forecast chart and a caption reading last close 307.34, forecast 253.21 (-17.61%), projected range 245.72 to 309.14, plus a "not financial advice" disclaimer.](/assets/img/kronos-bot-chat.png)
*An open model, a Yahoo Finance feed, and an afternoon. That is the whole stack.*

The catch with "always on" is worth naming, because people underestimate it. The bot is a program that has to be awake to answer, and the model needs a processor to run on. While it lives on a laptop, the laptop is the server, so the laptop can never sleep. The fix is to stop being the server. The same code dropped onto a cheap always-on cloud box (a five-dollar-a-month Linux machine is plenty) runs day and night without touching your own computer. The code already detects its hardware and falls back from GPU to CPU automatically, so it runs unchanged on a plain server, just a little slower per chart. That is the entire arc of modern tooling in one sentence: an open model, a tiny VM, and an afternoon now buy you something that used to require a seat on a trading floor.

---

## The disclaimer that holds the post up

Kronos is a **research model, not a money printer**, and the gap matters. Each forecast is one sampled trajectory from a probabilistic model. It does not know about earnings dates, a surprise rate decision, or the headline about to move a stock. The authors are careful to frame it as a foundation for analysis, and their own repo notes that any real strategy needs portfolio construction, transaction costs, slippage, and risk management layered on top before raw predictions become anything resembling "pure alpha." "The chart went down" is not a thesis.

What it *is*: a remarkably clean snapshot of where machine-learning forecasting actually stands in 2026, packaged so well that trying it is an afternoon, not a quarter.

---

## The takeaway

Two things are worth holding onto.

First, the moat keeps shrinking. The barrier to *trying* the kind of forecasting that an entire premium industry rents out is now roughly zero: a public repo, an MIT license, and a friendly `from_pretrained()`. You do not have to believe it beats the professionals to notice that the floor just dropped out from under the entrance fee.

Second, the distance between "interesting research" and "thing you can run, all day" has nearly collapsed. A paper accepted at a top AI conference in one tab, a live forecast in the other. The hard part is no longer the building. It is keeping your facts straight while everyone around you is shouting that Wall Street got hacked.

👉 **Look at the work yourself: [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) · [the paper](https://arxiv.org/abs/2508.02739) · [the live demo](https://shiyu-coder.github.io/Kronos-demo/).** Stars to the Tsinghua team. They gave away the homework.

*Not financial advice. Genuinely. If a sampled path from a 25-million-parameter model is your investment committee, we should talk about something other than this blog post.*
