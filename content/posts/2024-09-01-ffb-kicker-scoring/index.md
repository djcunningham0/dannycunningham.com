+++
title = "Should My Fantasy Football League Change Our Kicker Scoring Settings?"
subtitle = "Analyzing potential changes to fantasy football's least important position"
date = 2024-09-01
tags = ["data analysis", "fantasy football"]
draft = false
description = "Another year, another request for fantasy football rule changes. This time some people want to use a new scoring system for kickers. Let's (over)analyze how it would impact scoring."
+++

I've been running a fantasy football league for the past... too many years to count.
One of our league members pointed out that our platform (Yahoo) has started offering a new scoring option for kickers.
The immediate reaction among the league was mixed: a few people supported the change, one or two opposed it (most were probably indifferent).
It would be a pretty small change to the least interesting position in the game, but what the heck, let's (over)analyze it.
I won't go to quite the same lengths I did for [defense scoring]({{< relref "posts/2022-09-06-ffb-defense-scoring" >}}) a couple years ago, but I'll have a little fun with it.

## The proposed change

In fantasy football, kickers score fantasy points for field goals and extra points.
The proposed change would only affect field goal scoring.

Under our current (and Yahoo default) settings, field goals are bucketed by distance and each bucket earns a certain number of points.
Field goals up to 39 yards score 3 points, 40-49 yards score 4 points, and 50+ yards score 5 points.

After the change, the yardage buckets would be eliminated.
Field goals would score 0.1 points per yard (e.g., a 35-yard field goal would score 3.5 points).

(Extra points would be unaffected by the change.
Kickers earn 1 fantasy point for making an extra point.
Our league does not penalize missed field goals or extra points.)

## Arguments for the change

The original proposal was that we could "spice up kicking" by making the change.

OK, that's not much of a real argument.
I think the appeal is that higher degree-of-difficulty kicks would earn more points, which rewards better players, at least in theory.
When someone kicks a record-setting 67-yard field goal, shouldn't that earn more fantasy points than a pedestrian 50-yarder?

There's also an argument that the distance buckets are too arbitrary.
Why should a 40-yard FG score a whole point more than a 39-yard field goal when those distances are so similar?
Every other fantasy football position moved to fractional scoring years ago, so why not kickers?
<!-- (I'm old enough to remember playing fantasy football before fractional scoring was the norm.) -->

The new scoring system would also arguably be simpler than the current one.
In general I prefer simple over complicated for fantasy football rules (I think most people would agree with me).

## Arguments against the change

The main argument from the people who opposed the change was that the relative scores don't fairly account for the value of different kicks.
Basically, short kicks (< 30 yards) would score fewer points under the new settings and thus would be undervalued.
One person argued: "Should a 60-yarder really be worth 4 times a 15-yarder? No."
[Editor's note: There's no such thing as a 15-yard field goal---the shortest possible field goal is ~18 yards---but the sentiment is valid.]

There's also an argument that the new scoring system would inflate kicker scores too much.
While short kicks would be worth fewer points, most field goals are longer than 30 yards and would score more points, so overall kicker scores would increase with the change.
All reasonable people can agree that kickers should not be the focal point of fantasy football, so it might not be a good idea to increase kicker scoring.

## What does the data say?

Neither set of arguments really swayed me.
My first thought was, does it even matter?
If you break it down, the new system would result in one bucket of field goals becoming slightly less valuable (20-29 yards), and several groups becoming slightly more valuable (31-39, 41-49, and 51+ yards).
My gut tells me that's going to have very little impact on kicker fantasy points.

But fortunately we don't have to rely on my gut!
NFL kicking data is (somewhat) readily available[^1] and it's pretty straightforward to analyze what the fantasy scoring impact would be.
I pulled all field goals from the previous NFL season and applied both the current and proposed scoring systems to them, then compared the results.

It turns out my gut was pretty much right.
On average, kickers would only score about 0.3 more points per week.
That's only 5 points over the course of a 17-game regular season.

{{< figure
    src="overall_bar_chart.png"
    alt="Bar chart showing average kicking fantasy points per team per week in the 2023 NFL season under the current and proposed scoring settings. Current settings: 8.07. Proposed settings: 8.36."
    caption="Kickers would score about 0.3 more points per week under the new settings."
    >}}

Would some teams disproportionally benefit?
Maybe a handful of prolific kickers would score a lot more points while everyone else stayed about the same, leading to imbalance in kicker scoring.
Nope.
Everyone seems to get about the same benefit from the new settings, including the top guys.
(There's some variance of course, and a couple teams--the Raiders and Broncos--would actually score *fewer* points with the new settings.)

{{< figure
    src="season_points_by_team.png"
    alt="Bar chart showing total season fantasy points for the top 12 teams in 2023 season. Almost all teams would score 4-6 points more under the new settings. Dallas has by far the most points under both the old and new settings."
    caption="Most teams get about the same number of additional points under the new settings. (And holy cow, Brett Aubrey had a great year with Dallas. Maybe I'll draft him this year...)"
    >}}

The most notable impact I found was an increased variance in kicker scores.
The average increase of 0.3 points per week isn't going to sway many fantasy matchups, but there will be weeks somebody scores 1 or 2 extra points, which could easily flip a wins and losses over the course of a season.

{{< figure
    src="distribution.png"
    alt="Histogram of the change in fantasy points per team per week if the new settings were adopted. There is a large spike at zero (no change), and most other changes are small positive values, mostly between 0 and 1, with a few extending all the way up to +2.5."
    caption="Most kicker scores in a given week will have small changes under the new settings, but it's fairly common to have a larger change of +1 or more."
    >}}

Looking at it another way, that means *some* kicker is probably going to get a big benefit from the new settings each week.
It would have to be a kicker who made multiple field goals, so some big weeks under the old settings are going to be transformed into *huge* weeks under the new settings.
If we look at the top 12 scoring kickers in each week, we see that top two or three scorers in a given week typically benefit a lot from from the new settings and the effect gradually shrinks (to basically zero) as we go down the list.
(Of course, no one knows who those top few kickers are going to be in any given week.)

{{< figure
    src="box_plot.png"
    alt="Box plot showing the distribution of scores for the top 12 kickers in each week. The top few spots have higher variance and the median score is significantly higher under the new settings. Farther down the list, there is lower variance and not much difference between the new and old settings."
    caption="A few high-scoring kickers benefit a lot from the new settings each week."
    >}}

In conclusion, if we implement the new settings we'll have a little more variance in kicker scores, with many kickers getting a small increase and two or three kickers getting a sizeable increase each week.
But those big weeks are pretty randomly distributed so it's likely to all wash out over the course of the season.
It may sway a few close matchups, but it's pretty randomly distributed and it doesn't look like any kickers (and by extension, any fantasy managers) stand to gain any advantage over a whole season.
For those reasons, I'd say the impact of the new kicker scoring settings would be pretty small.

## The verdict

I decided to put it up to a league vote.
We have 12 teams in our league, so if we get 6 "yes" votes we'll make the change (I'm sitting out the vote, so that would be a majority).


Given the minimal impact, I don't feel very strongly about which way the vote goes.
If I had to make a choice, I'd probably vote "yes" because I like the simplicity argument (0.1 points per yard seems simpler than the arbitrary distance buckets).
But it's also just nice to make a change sometimes.

**[UPDATE] We're making the change.**
The vote passed with 6 "yes" votes to 3 "no" (with 2 people abstaining).
I'm sure there will be some drama when a few matchups are inevitably impacted by the change!

**[UPDATE 2]** After seeing how great Brett Aubrey was last season, I decided to draft him.
Hoping for a repeat!

**[UPDATE 3 🎉]** We had our first matchup result flipped in Week 3, and I was the beneficiary!
Brett Aubrey scored 12.6 points and he only would have scored 10 under the old settings (largely thanks to a *65-yard* field goal).
My opponent's kicker had a net change of -0.7 due to the setting change.
Combined, that's a 2.3 point swing in my favor, and I won the matchup by just 0.5 points!
On a related note, Aubrey is on a real heater to start the season.
He's already +4.7 through three weeks due to the scoring change.


[^1]: I used the [nfl_data_py](https://github.com/nflverse/nfl_data_py) Python package to pull NFL play-by-play data.