---
external: false
title: "quiet pages"
description: "notes on a site that tries not to get in the way"
date: 2026-08-19
banner: /images/miyazaki.jpg
---

Most personal sites now look like they were assembled from the same kit. A hero, a stack of cards, a progress bar, "3 min read", social proof in the footer. None of that helps you read. It just proves the author has a website.

I wanted the opposite. A page that sits there and lets the text do the work.

## type is the whole thing

The site is [Ioskeley Mono](https://github.com/ahatem/IoskeleyMono) at 12px. Headings, body, nav, table of contents — same size. I tried the usual trick of making titles bigger and the whole thing immediately looked like every other blog. Hierarchy through scale is easy. It's also lazy. Once the type is the same size everywhere, you only have weight and space left, which is enough if you don't panic.

People treat "design" as a layer you pour on afterwards. Color, motion, a custom cursor. I think of it more as deciding what is allowed to compete with the sentence you're in the middle of. Most of the web fails that test. Ads, cookie banners, a floating chat widget, a subscribe modal at 40%. The content is a guest on its own page.

A personal site shouldn't have that problem. There's no growth team. There's no reason for the chrome.

Monospace is a bit of a cliché for this kind of page, I know. I still prefer it. The letters sit on a grid, the line lengths stay honest, and you stop pretending you're typesetting a magazine. At 12px a lot of monospaces turn into noise. This one holds.

## gray, on purpose

There isn't a palette with names. Background is a dirty white, not `#ffffff`. Body is gray, headings almost black. Dark mode is the same idea flipped. I don't want the page to have a mood. I want it to disappear.

I tried real syntax highlighting for a while. Every theme looked like someone marked up a terminal with highlighters. So code is gray too. Comments a little dimmer.

```bash
# this is a comment
npm run build
```

The `[ copy ]` button on code blocks is the one piece of UI I kept after telling myself I wouldn't add any. I use it constantly on other sites. Hypocrisy, but a small one.

## dither

I like pictures that look printed. Dithering takes a photo, throws out the smooth gray, and rebuilds it from dots — newspaper, Game Boy, a cheap laser printer from 1994. It's noisy up close and it snaps into an image if you squint. Against this typeface it doesn't feel pasted on. It feels like the same material.

The banner at the top of this post is that. The donut is too, built from [donut.c](https://www.a1k0n.net/2011/07/20/donut-math.html): Andy Sloane's spinning torus, the one that prints itself into a terminal. I've had that program in my head for years. Once the rest of the site went 1-bit, dropping it in the sidebar was the only logo that made sense.

## what design is for, here

I don't think a site like this needs a brand. It needs a temperature. Cool enough that you can sit with a long post, specific enough that it doesn't feel like a template.

The useful test, for me, is whether I can reread my own writing without noticing the layout. If I start fiddling with padding, the page is still louder than the sentence. If I forget the layout is there, it worked.

That's all this is. A room with the lights set and the furniture against the wall. Source is [here](https://github.com/odurgut/odurgut.github.io) if you want to see how it's put together.
