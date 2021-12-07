---
sidebar_position: 1
title: Overview
---

## Templates

Templates can help you get started either building an application using the Zea Engine, or writing a new plugin for the engine.

<section class="cards-large">
<div class="card-large" markdown="1">

[![Zea Svelte Template](/img/misc/zea-svelte-template.jpg ':class=cardImg-large')](https://github.com/ZeaInc/zea-svelte-template)
[Zea Svelte Template](https://github.com/ZeaInc/zea-svelte-template ':class=cardTitle-large')

Need to get up and running quickly? Zea provides a template application built using the popular new [Svelte](https://svelte.dev/) framework. This Template comes with a library of Svelte components that you can use to customize the application to your own requirements.
the Svelte template combines all of the stock libraries into a single well structured app. It shows how to setup UX, Collab, authentication, CAD rendering, selection etc...

 </div>

<div class="card-large" markdown="1">

[![zea-plugin-template](/img/misc/zea-plugin-template.png ':class=cardImg-large')](https://github.com/ZeaInc/zea-plugin-template)
[Zea Plugin Template](https://github.com/ZeaInc/zea-plugin-template ':class=cardTitle-large')

If you are interested in building your own plugin, or just want to see some sample code on how to extend the engine, check out the plugin template. The goal of the plugin template is to provide a quick start on building your own plugins, using the best practices, such as unit testing, end-to-end testing, and semantic versioning. We use the plugin template when we start working on a new plugin to get up and running quickly.

 </div>

</section>

## Plugins

The Zea Engine provides a core and basic functionality, and a collection of plugins that extend the functionally of the engine for more specific use cases.

<section class="cards-large">

<div class="card-large" markdown="1">

[![Zea UX](/img/misc/ux-handles.jpg ':class=cardImg-large')](https://docs.zea.live/zea-ux/)
[Zea UX Manual](https://docs.zea.live/zea-ux/ ':class=cardTitle-large')

The UX library provides a collection of plugins and tools for User Experience, such as Undo Redo, Onscreen widgets for moving objects around, and 3d controls to edit scene parameters.

</div>

<div class="card-large" markdown="1">

[![Zea CAD](/img/misc/4x4.jpg ':class=cardImg-large')](https://docs.zea.live/zea-cad/)
[Zea CAD Manual](https://docs.zea.live/zea-cad/ ':class=cardTitle-large')

To handle loading massive CAD and BIM data sets quickly, Zea provides the CAD plugin that loads and renders large CAD data sets with ease. CAD data is quite different from other kinds of data, and Zea CAD leverages the unique properties of parametric surfaces to reduce load times and increase size limits when loading CAD and BIM data in the browser.

 </div>

<div class="card-large" markdown="1">

[![Zea Collab](/img/misc/vr-collaboration.jpg ':class=cardImg-large')](https://docs.zea.live/zea-collab/)
[Zea Collab Manual](https://docs.zea.live/zea-collab/ ':class=cardTitle-large')

One huge benefit of web applications is being able to connect users together for collaboration or presentations. The Zea Collab library provides Client and Server side tools for connecting and synchronizing users.

 </div>

<div class="card-large" markdown="1">

[![Zea Potree](/img/misc/zea-pointclouds.jpg ':class=cardImg-large')](https://docs.zea.live/zea-potree/)
[Zea Potree Manual](https://docs.zea.live/zea-potree/ ':class=cardTitle-large')

Zea Potree is a plugin for Zea Engine that integrates the powerful [Potree](https://github.com/potree/potree/). Zea Potree enables loading and rendering of massive LiDAR and point cloud data directly in the browser. The integration of Potree into Zea Engine provides a few important improvements, including better performance and reduced battery consumption on mobile devices. When combined with the other powerful features of Zea Engine, like CAD and BIM data loading, Zea Potree can be used for advanced uses cads such as metrology and build inspections.

 </div>

</section>

## Getting Started

- [Getting Started With Zea Engine](../Manual/Getting-Started/getting-started-overview.md)
  To get started using Zea Engine, you can start by learning the basics of how to setup the engine yourself in the Getting Started guide

- [Zea Svelte Template](https://github.com/ZeaInc/zea-svelte-template)
  Or you can jump straight into a full web application using the Svelte template.
