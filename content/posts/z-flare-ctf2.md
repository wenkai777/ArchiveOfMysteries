+++
date = '2025-12-01T00:00:00-00:00'
draft = false
title = 'Flare.io CTF-2: Stat-Bearers'
tags = ['Write-up','CTF','Web','Flare']
+++

This is a write-up on Flare.io CTF's week 2 of 6.

## Overview

The challenge is titled 'Stat-Bearers', we are given a website

> https://jimmyswebspace.net/ 

and the hint

> Align your stats to claim the prize.

### Recon

The site is a character sheet for Sir Alaric, displaying his stats. Other than that, the Respec button is disabled.

{{< figure src="/images/flare-25/stat-website.png" alt="stat website" width="600px" >}}

Before continuing the quick recon, I checked the basics /robots.txt, /api, /secret, etc. unfortunately, nothing came out of it. Back to Alaric's report card, it's important to notice that Sir Alaric might be strong but he is **Flagless**, and we cannot leave him like that.

{{< figure src="/images/flare-25/flagless.jpg" alt="flagless" width="600px" >}}

It is now time to take a look at the source code, the first thing that caught my eye was was the 2 constants:

```
const ABCDEFG = 73;
const DEFAULT_COOKIE =
    "MmsaHRtrc3B8ZWsNDBFrc31/ZWsKBgdrc355ZWsABx1rc315ZWseABprc3x8ZWsPBQgOa3N5NA==";
```

The default cookie seems to be base64 but when put in a base64 decoder it doesn't give me any readable string. Continuing in the source code, I found a few functions. In summary from my understanding, the stats are encrypted and stored as a base64 string cookie, the website takes the cookie and decrypts it using the ABCDEFG key.

```
(c) => c.charCodeAt(0) ^ ABCDEFG
```

and finally parse it to JSON.


### Script

Considering the source code and the challenge title, my idea is to reverse the process, forging a cookie in order to change Sir Alaric's stats. So I reversed the getStatistics function:

```
const stats = { STR:100, DEX:100, CON:100, INT:100, WIS:100, FLAG:100 };
const json = JSON.stringify(stats);
const encrypted = Array.from(json)
  .map(c => String.fromCharCode(c.charCodeAt(0) ^ 73))
  .join('');
const encoded = btoa(encrypted);
document.cookie = `stats=${encoded}; path=/; SameSite=Lax`;
```

Essentially, in the console I setup the stats, convert it to JSON, used the key 73 to encrypt it, encrypt it further using base64 and finally store it in the stats cookie. Now if I reload it will load the stats from the forged cookie rather than the default one. Initially I tried changing only the Flag value to 1 but nothing happened. Then considering the quote *Align your stats*, I bumped all of his stats to the same high value of 100 trying to max out the stat bar. No need to thank me Sir Alaric. This time when reloading the page I got this result on the character sheet:

{{< figure src="/images/flare-25/flag100.png" alt="flag" width="600px" >}}

The flag is now revealed on the character sheet, leaving Sir Alaric flagless no more.

`flare{r3specc1ng_Al4ric_15_eXp3nsive}`