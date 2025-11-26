+++
date = '2025-10-20T00:00:00-00:00'
draft = false
title = 'BrainFuck CTF - 11 Write-ups'
tags = ['Write-up','CTF','OSINT','Cryptography','Hackfest']
+++

At this year's Hackfest, my teammate Marzzeau and I attempted the BrainFuck CTF, as it is described on their website it's a serie of unconventional puzzles that requires logic, cryptography, OSINT and linguistics. 

## Overview

Here are our credentials for this CTF:

{{< figure src="/images/bf-ctf-25/bf_scoreboard.webp" alt="scoreboard" width="600px" >}}

See table of content to access a specific challenge faster

### Snake

Description: No information provided

This was personally my favourite puzzle, on hackfest's twitter page we found this:

{{< figure src="/images/bf-ctf-25/bf_snake.webp" alt="snake" width="400px" >}}

It's a short video of the game snake being played, the pastebin is password protected and the snake captures 4 flags. While we watch the video Marzzeau brings up that the snake moves a lot before each flag, maybe tracing letters? Upon that notice I start counting the movements between each flag. Turns out the snake changes direction exactly 8 times before reaching a flag which would map greatly to binary, we just had our Interstellar moment. Noting every left turn as 0 and every right turn as 1 we end up with
> 00110001 00110111 01010100 01001000

Mapping it to ASCII characters
> 17TH

I test it as the pastebin password and we end up getting the flag

`{LEFT_RIGHT_LEFT_RIGHT}` **5 points**

### "Info around me"

Description: No information provided

On the conference badge, there was a barcode upon scanning it I was lead to a pastebin account with a password protected pastebin named *"Info around me"*. There didn't seem to be any visual clues depicted on the site, such as date or group, but ultimately searching for more I clicked on the account user's profile picture which gets the following:

{{< figure src="/images/bf-ctf-25/bf_pfp.webp" alt="profile picture" width="300px" >}}

> ITHOUGHTWHAT1DDOWASPRETENDIWASAD3ADMAN

It really is around him after all... this also happens to be a ghost in the shell reference quote. So I tried a variation of GhostInTheShell and Deadman as the pastebin password but none of them worked. Then I tried that entire sentence as the password and got the flag

`{VERY_POOR_OPSEC}` **1 point**

### Colorblind

Description: No information provided

A colorblind image with a password protected pastebin link could be found on mastodon, I simply put it through a colorblind filter online

{{< figure src="/images/bf-ctf-25/bf_colorblind.webp" alt="colorblind and imageblind" width="500px" >}}

Result reads as
>3LZ6

which I input as the password of the pastebin link and got the flag

`{FREE_DIAGNOSIS}` **2 points**

### Do not engage

Description: No information provided

Walking around the conference, we stumbled upon a sign in the corner of the HFCTF room

{{< figure src="/images/bf-ctf-25/bf_engage.webp" alt="do not engage" width="300px" >}}

Above some letters a black dot can be seen which put together gave us
> RB.GY/CUCOAB

This link wouldnt work and so Marzzeau suggested putting it through a link unshortener in which we got the pastebin link with the flag

`{DO_NOT_SUBMIT!}` **2 points**

### Freebie

Description: No information provided

While scouting the source code of the hackfest BrainFuck page, we found a pastebin link

{{< figure src="/images/bf-ctf-25/bf_freebie.webp" alt="source code" width="500px" >}}

`{title_says_it_all}` **1 point**

I wonder why unlike the other flags this one isn't all caps

### Inside

Description: No information provided

At the start of the conference we are given this card with a sticker that reads Don't look inside... so I didn't. Jokes aside, our first instinct which came from a similar challenge at Northsec CTF 2025 was to scan it with a NFC reader.

{{< figure src="/images/bf-ctf-25/bf_inside.webp" alt="nfc card" width="200px" >}}

Result is a pastebin link with the flag

`{GREAT_FOR_YOUR_WALLET}` **3 points**


### Location, location, location, location

Description: No information provided

Near the entrance of the conference a map of the conference layout can be found with 5 laughing faces, one with an open lock and one with a locked lock. Going to all these locations and searching around I found stickers with tags inside of them. Reading them with a NFC reader I got a pastebin link per location

Location pastebin 1 (the one with an open lock)

Location, Location pastebin 2

Location, Location, Location pastebin 3

Location, Location, Location, Location pastebin 4

Password protected pastebin (the one with a locked lock)

Every location gave strings and I tried to put those as pastebin links but it didn't work. Seeing that location 1 had an open lock I tried to put the string given in pastebin 1 as the password to the locked lock location. It worked and that pastebin gave me the link to a google docs

{{< figure src="/images/bf-ctf-25/bf_location_link.webp" alt="locked location pastebin" width="400px" >}}

However that link is way to short to be a google docs so I appended the other locations given string to the link and it gave us access to the document which had the flag as the document title and on the document

{{< figure src="/images/bf-ctf-25/bf_location.webp" alt="document" width="300px" >}}

`{EASTER_EGG_HUNT}` **5 points**

### Unfolding / Volant

Description: No information provided

During the second day of the conference, I sat on a couch reading the pamphlet with my friend wondering what talks we would attend today. Making it past the talks, I stumbled upon the BrainFuck announcement which looked completely normal.

{{< figure src="/images/bf-ctf-25/bf_book.webp" alt="pamphlet" width="500px" >}}

However the green line caught my eye, Prize, who doesn't like prizes. As I try to read it I lost a few braincells, what the f**k is a tails/voir?? That's when I noticed it was just a seperation between the english and french translation and most importantly it was not tails but the word details which was missing it's e. So i read all of the background text and took note of every missing letter
> *b*rainfuck, ed*i*tion, *t*outes, *l*es, ph*y*sique, *e*sprit, h'*h*esitez, endr*o*its, yo*u*r, pu*z*zles, e*y*es, d*e*tails, de*t*ail

> bitlyehouzyet

Looking at the 5 first characters it is clearly a bit.ly link and so I searched up bit.ly/ehouzyet which led to a pastebin with the flag

`{YOU_NEVER_LISTEN}` **3 points**

### Vandalism :(

Description: No information provided

Walking around the conference this very cool looking poster could be found on the wall

{{< figure src="/images/bf-ctf-25/bf_poster.webp" alt="poster" width="300px" >}}

The universal repository of knowledge is probably a reference to Wikipedia and the theme of the conference is based on *Ghost in the Shell*, since the poster provides a timestamp we decided to take a look at the version history of Ghost in the Shell's wikipedia page which coincidently has a version with that exact timestamp and the author is HF?? couldn't be more obvious. 

{{< figure src="/images/bf-ctf-25/bf_wiki.webp" alt="wiki" width="500px" >}}

On this version of *Ghost in the Shell* in Wikipedia we found a pastebin with the flag and no I will unfortunately not be donating to wikipedia.

`{DONATE_TO_WIKIPEDIA}` **3 points**

### Winking

Description: No information provided

On provided stickers at the start of the conference, one of them was a winking laughing man, here is what it looks like

{{< figure src="/images/bf-ctf-25/bf_wink.webp" alt="wink" width="400px" >}}

We noted down every character in line with the white lines from shortest to longest and got
> RB.GY/I5KO4N

after putting it into an unshortener it gave us a pastebin link that contained the flag

`{MAY_REQUIRE_MAGNIFICATION}` **3 points**

### Frames

Description: No information provided

With almost no time left on the clock we find this picture we somehow missed on hackfest's facebook

{{< figure src="/images/bf-ctf-25/bf_frames.webp" alt="frames" width="300px" >}}

Obviously the link is password protected but with those numbers, Marzzeau found a website to check the frames of the movie *Ghost in the Shell*, the frame could be changed by tweaking the source code and those exact frames listed in the numbers would be frames with words. So we put it together which gave us
> ACCESSFRIENDLYPOLICEDATAINTHEEXIT

the password to the pastebin

`{EVERY_FRAME_A_PAINTING}` **3 points**

HOWEVER, we were unable to submit it as it was 1 minute pass ending...

## Final Results

By the end of the conference, after getting paranoid and starting to believe everything around me could be a clue, we ended up scoring ***11/17 flags*** for a total of ***29 points*** (would have been 12 flags and 32 points if we had a single extra minute). We placed 7th, however we will be back next year aiming for that 1st place and black coin!

{{< figure src="/images/bf-ctf-25/bf_result.webp" alt="results" width="600px" >}}