+++
date = '2025-12-09T00:00:00-00:00'
draft = false
title = 'Flare.io CTF-3: Layer-Walkers'
tags = ['Write-up','CTF','Web','Forensics','Flare']
+++

This is a write-up for Flare.io CTF, Week 3 of 6. This challenge takes place during a very demanding academic period, the finals... Although time was limited, I learned to work more efficiently in order to balance my responsibilities.

## Overview

The challenge is titled 'Layer-Walkers', we are given a website

> `https://techno-plaza-2000.com/`

along with the hint:

> One layer opens another.

### First glance

The website in question is formatted as a forum, it contains boards and posts. Here are the 5 boards: 
1. Random `/b/` containing few posts with Mr. Robot the show (Debating watching it, is it worth the watch?)
2. Technology `/g/` containing posts with an IP address and an executable "stealer-cleanup.exe", you best believe I will not be touching that
3. CTF `/hack/` containing almost nothing, however unlike the other boards, it wasn't locked, allowing users to make posts on this board
4. Images `/i/` containing mostly random posts with memes
5. Paranormal `/x/` containing random posts with aliens

{{< figure src="/images/flare-25/technoplaza.png" alt="website look" width="600px" >}}

### Web Shell

The unlocked board that allowed posting with the title CTF and path /hack was just one big red herring, who would ever fall for this... well turns out I would...

Considering the situation at hand, my instinct told me it had to do with the ability to post images in the CTF board. The backend is PHP considering there is a cookie named PHPSESSID and uploading a picture for a post stores it at `https://techno-plaza-2000.com/hack/src/<generated_id>.jpg`. This led me to believe that I could make a web shell disguised as a JPG. I then spent the next half an hour trying to get a web shell working which got me absolutely nowhere. After a bit of research I came to the understanding that my method wouldn't work because the files are stored by the web server in a static assets directory in other words, PHP was not going to execute in this directory rendering my web shell approach useless.

{{< figure src="/images/flare-25/angry.webp" alt="fell for it again" width="200px" >}}

### Opening the Matryoshka Doll

Following this, I started searching around for more clues. That's when I found in the Paranormal board a post with the following picture

{{< figure src="/images/flare-25/matryoshka.png" alt="matryoshka doll" width="300px" >}}

I can't believe I missed this 1337 "leet" which was used a few times by the challenge designer when pricing the rewards, furthermore the text tells us that this image contained a hidden challenge and the Matryoshka doll was the biggest tell of them all. The challenge hinted at "One layer opens another" and the Matryoshka doll is a set of dolls placed one inside another decreasing in size as you go through the layers. Therefore, it made sense for data to be hidden inside this image.

I ran `binwalk -e` on the image which extracted a *metadata.mp3*. To look at the metadata of this MP3 file I ran `exiftool` and found binary data in the **Comment** metadata tag

{{< figure src="/images/flare-25/layer3-exif.png" alt="metadata.mp3 exif result" width="600px" >}}

I then used an online binary decoder which gave me this result:

```
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
```

The output looked like Base64, but upon trying to use an online decoder to decode this Base64 into text, it didn't give anything readable. Therefore I switched my approach, slapped this b64 blob into a file, decoded it to binary using `base64 -d layer5.b64 > layer6.bin` then ran `file layer6.bin` which showed me:

> layer6.bin: XZ compressed data

So the next logical step was to use `xz -dc layer6.bin > layer7.txt` to decompress the data. The .txt result contained a lot of noise, but also the flag. While I already have the flag by looking at the noise I can tell that the intended solution goes further so let's try to accomplish it in the intended way.

{{< figure src="/images/flare-25/layer7-txt.png" alt="txt result" width="400px" >}}

### It's over when I say so

The .txt contained tar archive headers, an ELF binary as well as some messed-up ASCII art. So I took a step back and decompressed it into .bin instead of .txt using `xz -dc layer6.bin > layer7.bin`. Now looking at the result file type we get:

> layer7.bin: POSIX tar archive (GNU)

Then I extract it using `tar xf layer7.bin` which extracts a stage2 directory that contains a compiled binary. Running `strings` on this ELF would also give the flag but instead I decided to run this executable displaying the flag as intended.

{{< figure src="/images/flare-25/layer8-elf.png" alt="flag" width="600px" >}}

`flare{n3sted_thr34d1ng_1337}`