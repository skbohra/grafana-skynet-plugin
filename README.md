# Grafana Skynet Data Source Plugin

[![Build](https://github.com/grafana/grafana-starter-datasource/workflows/CI/badge.svg)](https://github.com/grafana/grafana-starter-datasource/actions?query=workflow%3A%22CI%22)

Grafana Skynet Data Source Plugin

## What is Grafana Data Source Plugin?

Grafana supports a wide range of data sources, including Prometheus, MySQL, and even Datadog. There’s a good chance you can already visualize metrics from the systems you have set up. In some cases, though, you already have an in-house metrics solution that you’d like to add to your Grafana dashboards. Grafana Data Source Plugins enables integrating such solutions with Grafana.

## SkyDB Integration

This data source plugin integrates SkyDB with Grafana so that data stored in SkyDB (Key-Value pair) can be displayed in the Grafana Dashboard. 
Plugin Configuration requires you to enter following values - 
   - Portal URL for the Siasky instance (i.e. https://siasky.net)
   - Seed - you seed key to generate public, private key to fetch data
   - dataKey - dataKey for which you want to fetch data for from SkyDB
   - For Storing Data we are currenly using https://note-to-self.hns.siasky.net/

This is a very first version and supports only fetching single value and display as a Stat in the dashboard. 

## Future Plans

Next logical step would be to make a SkyDB based Time Series Database and Frontend, Deployed ton Akash, to store Metrics data, which will be useful to have a fully fledged decentralized Grafana solution.


## Getting started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Build plugin in development mode or run in watch mode

   ```bash
   yarn dev
   ```

   or

   ```bash
   yarn watch
   ```

3. Build plugin in production mode

   ```bash
   yarn build
   ```

## Learn more

- [Build a data source plugin tutorial](https://grafana.com/tutorials/build-a-data-source-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System
