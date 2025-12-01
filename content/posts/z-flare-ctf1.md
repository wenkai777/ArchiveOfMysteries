+++
date = '2025-11-25T00:00:00-00:00'
draft = false
title = 'Flare.io CTF-1: Knights of the Stolen Session'
tags = ['Write-up','CTF','OSINT','Forensics','Git','Flare']
+++

Flare.io is hosting a CTF in which they release 1 challenge a week for the next 6 weeks. The theme is medieval which I love. I'm a big fan of games like *elden ring* and *dark souls*, in otherwords anything with knights, mages, dragons, etc. It's a very pleasing aesthetic in my opinion. This write-up is about this week's challenge, the first of six.

## Overview

The challenge is titled 'Knights of the Stolen Session' and all that is given is a GitHub profile with one repository of a d20 simulator.

{{< figure src="/images/flare-25/github-repo.png" alt="github_repository" width="600px" >}}

### First glance

The GitHub repository contains 3 files; `readme.md`, `roll-test-chat.txt` and `roll.py`. While these three files are eyeing me, my first instinct was to analyse the github properly. I looked at the branch and commits to see if anything is out of the unordinary, but nothing unusual except for the latest commit where roll-test-chat is added, a description is given:
> Logs of the great IRC 

I then take a look at the starred repository, there were 3; his own repo, ExifTool and phpMyAdmin. Since ExifTool is used for inspecting image metadata and there were only Python code in the repo so I let go of this path.

Once the quick github sweep is done, I cloned the repo and ran ExifTool on every file just in case but everything is normal. The readme.md is a very normal description on how to use the roll.py, roll.py is a python script that simulates a d20 and lastly roll-test-chat.txt looks to be the most eye catching one. Here's a sample:

```[#knights-of-the-stolen-session-dice-lounge ]
swordnshield: alright nerds the roll script is live and I want to test it out. type !roll xdY+Z and try not to break it in the first five minutes like last time
ratpaladin: "not to break it" bro it fell apart last time because you coded it
bard_ofbytes: he wrote that thing like a 4-year-old
artemisafk: both of you shut up, I’m trying to eat noodles and deride you simultaneously
hexgobl1n: ok seriously shut your goblins I roll initiative
hexgobl1n: !roll 1d20+3
 swordnshield (roll-bot): → 1d20 (4) + 3 = 7
ratpaladin: LMAOOOOOO
artemisafk: bro rolled a SEVEN. you couldn’t initiative your way out of a wet paper bag
hexgobl1n: I hope your router catches on fire
bard_ofbytes: anyway, welcome to our campaign, "Knights of the Stolen Session"
ratpaladin: bro that sounds like we’re LARPing as PAM interns
hexgobl1n: ngl that’s actually the vibe
artemisafk: ok I cast perception before Rat does something stupid again
 !roll 1d20+1
 roll-bot: → 1d20 (2) + 1 = 3
bard_ofbytes: LMFAOOOOOOO
```

There's is a lot to unpack here. It looks like a discord channel, there's a **#channel-name** at the top and similar chat formatting, espacially with the roll-bot. There's weird mentions of stolen session and other words like PAM, RuberDucky but none of those made sense in this CTF context. So after trying to see if there's a hidden encryption in this txt like rolls mapping to a character I went down the python route.

### Down the rabbit hole

This is where hell began, essentially I noticed that the txt contained raw results, the roll-bot gives out 15 raw results before modifiers

> 4, 2, 19, 6, 14, 1, 17, 7, 13, 20, 1, 16, 8, 11, 14

After another read, I noticed it was not 15 but 16 raw results since this is mentioned:

```
 !roll 1d20-2
 roll-bot: → 1d20 (20) - 2 = 18
hexgobl1n: NAT 20 BAYBEEE
swordnshield: stop celebrating you rolled with disadvantage
```

While it looks like 1 raw result, it's 2. Rolling with disadvantage means rolling twice and taking the weaker dice, meaning if he got the highest result, we also know the result of the second dice rolled not mentioned in the chat. This increases the raw results to 16

> 4, 2, 19, 6, 14, 1, 17, 7, 13, 20, 20, 1, 16, 8, 11, 14

roll.py uses `Random.randint(1, 20)` so now my goal is to find the seed used in this chat by matching it to those 16 outputs. I ended up writing a script that would check python seeds until it find a seed for which I would get the same 16 outputs. I also added a progress tracker because on first launch it was hard to tell how the script is progressing when there is no visual feedback.

```
#!/usr/bin/env python3
from random import Random

ROLLS = [4, 2, 19, 6, 14, 1, 17, 7, 13, 20, 20, 1, 16, 8, 11, 14]
ROLLS_LEN = len(ROLLS)

def seed_matches(seed):
    rng = Random(seed)
    for expected in ROLLS:
        if rng.randint(1, 20) != expected:
            return False
    return True

def main():
    start = 0
    end = 2**32
    progress = 1_000_000
    checked = 0

    print(f"Searching seeds {start}..{end-1}")
    for seed in range(start, end):
        if seed_matches(seed):
            print(f"Seed {seed}: {','.join(str(x) for x in ROLLS)}")
            print("Match found")
            return
        checked += 1
        if progress and checked % progress == 0:
            print(f"checked {checked:,} seeds")

    print("No match found")

if __name__ == "__main__":
    main()
```

Considering it didn't find a match within the first 100,000,000 seeds, I decided to attempt something else first and leave this to run overnight.

### Down the rabbit void

I tried many other tactics either with trying to figure out a clue in the roll-test-chat.txt or messing with the seed/dice generation. The most notable attempt was mapping the roll results possible flag text. So 1d20 can only roll a number between 1 to 20 which would map only from A-T, therefore we need at least 2d20. With 2 dice I can roll between 2 to 40 which is 39 characters, so lets set the mapping in this order:

>A-Z, 0-9, {}_

This is exactly 39 characters, so I ran a script that would roll 10,000 dices group them in pair then map this result, if for the 5,000 characters the word FLARE could be found it would also print the next few characters, I also made it so that it would do so for 100,000 seeds. The issue with this tactic is that it's extremely unlikely, the median of 2 roll is 21 so getting low numbers and high numbers are harder. As expected, there were a few FLARE's found but no flag format. At this point it was late and the seed script from earlier was nowhere near done, so I went to sleep.

I woke up all excited, expecting the overnight script to have found me a seed and this was the result:

```
...
checked 4,293,000,000 seeds
checked 4,294,000,000 seeds
No match found
```

Devastation....

### Salvation

A hint was dropped by a user named PHtheAdmin, they essentially said to look at the bigger picture. So I went back to the GitHub profile and searching around. I noticed that swordnshield had 4 commits yet there was 5 commits on the repository... How did I miss that on my first sweep... T-T

{{< figure src="/images/flare-25/odd-commit.png" alt="odd commit" width="400px" >}}

to get more details, I run:

```
git log
```

{{< figure src="/images/flare-25/git-log.png" alt="git log" width="400px" >}}

As we can see we have the same swordnshield author but whose email domain was a website

>bobshomepage.net

Going on this website, it stated that it had been discountinued and apart from text, there wasn't much else so I checked the classic `/robots.txt`:

```
User-agent: *
Disallow: /sealed-chamber-deadbeef.html
```

That's a very specific path, visiting it led me to *The Secret Place*, clearly on the right path considering the big d20 picture

{{< figure src="/images/flare-25/d20.png" alt="d20" width="400px" >}}

Given the quote under the image and the starred ExifTool repository, I ran ExifTool on the d20 image which revealed the flag under **User Comment**

`flare{0s1nt_m4st3r_749261}`