+++
title = "Are \"Hot Ones\" Viewers Sexist?"
subtitle = "Maybe a little bit, according to text analysis of YouTube comments"
date = 2019-08-16
tags = ["data analysis", "NLP"]
draft = false
description = "I analyzed the comments from episodes of the popular YouTube series \"Hot Ones\" and found some differences between episodes with male and female guests."
+++

<small>
<i>I originally wrote this post <a href="https://medium.com/@djcunningham0">on Towards Data Science</a> before moving it here.</i>
</small>

*Hot Ones*, "the show with hot questions and even hotter wings", has become something of a spectacle.
Since debuting four years ago in 2015, the YouTube interview show has grown steadily in popularity.
I watched my first episode about nine months ago.
Since then, *Hot Ones* has seemed to pop up in conversation every few weeks.

For those unfamiliar, *Hot Ones* host Sean Evans interviews one celebrity per episode.
What differentiates *Hot Ones* from any other celebrity interview?
First, Sean is an excellent interviewer.
Second, and most obviously, Sean and his guest eat a platter of increasingly spicy wings throughout the interview.
It's highly entertaining—if you've never watched, I recommend checking out a recent episode on the [First We Feast YouTube channel](https://www.youtube.com/playlist?list=PLAzrgbu8gEMIIK3r4Se1dOZWSZzUSadfZ).

Recently a friend of mine mentioned that *Hot Ones* episodes featuring women seem to get more sexist (or at least negative) comments than episodes featuring men.
I was easily convinced that there's at least some truth to that claim.
It's certainly not difficult to find some evidence—scroll through the most recent comments on an episode with a female guest and you'll easily find examples of sexist or objectifying comments.

That conversation got me thinking analytically.
A few hand-picked examples could easily be confirmation bias.
Would it be possible to objectively show that female guests get more sexist or negative comments than male guests?

## Defining the objective

There are a bunch of *Hot Ones* YouTube videos, some of which feature female guests.
Each video has a bunch of comments.
Our objective is to use statistics and data science to determine whether the comments for female guests differ from the comments for male guests in a way that can be described as sexist.
Sounds straightforward enough, but...

Computers do well with black-and-white problems.
They are very good at following defined instructions and performing complex computations, but they can't make judgement calls the way humans can.
Sexism is anything but a black-and-white problem.
You know it when you see it, but it's hard to define.
Two people could reasonably disagree about whether a given comment is sexist.
The same comment might be sexist in one context but not another.
It's a nuanced concept.

In other words, teaching a computer to identify sexism (or racism, hate speech, etc.) is hard.
It's also a really important problem in the social media era, but no one has come up with a great solution yet.
If you're interested, [this paper](https://arxiv.org/pdf/1808.09115.pdf) by Gröndahl et al. provides a nice glimpse into the current state of research in the field.

## Methodology and results

Compared to the cutting edge research in the field of hate speech detection, I'll be taking a simple approach.
Most hate speech detection techniques are based on classification models trained on a labelled dataset.
That approach would be the best way to address the problem at hand, but it would take a lot of time and effort to replicate those models on my dataset.
Instead, I'll take a somewhat indirect approach to identifying sexism using quicker, mostly out-of-the-box techniques described below.

All analysis was done using Python and is available in a [GitHub repository](https://github.com/djcunningham0/hot-ones-sexism-analysis).
The data and visualizations shown in this post can be found in a Jupyter notebook in the repository.

### Data overview

The dataset contains all of the YouTube comments on the videos from the first eight *Hot Ones* seasons—a total of almost 139 videos and over 1 million total comments[^1].
I split the dataset into two groups depending on whether there is a female guest in the video.
That means videos with multiple guests would be included with the "female guest" group if one of the guests is a woman.

In total, there are 23 videos with female guests and 116 without.
That's a huge discrepancy!
*Hot Ones* should probably try to get more female guests!
(Women have been featured more often in recent seasons, but there still hasn't been a season with 50% women.)

### Sentiment analysis

The first way we'll look for signs of sexism is by performing sentiment analysis, one of the most basic natural language processing techniques.
Sentiment analysis takes some text—in our case a YouTube comment—and assigns a score that classifies its sentiment as positive, negative, or neutral.
In this analysis, sentiment scores range from -1 to 1, where -1 is the most negative, 0 is neutral, and 1 is the most positive sentiment[^2].

Our underlying assumption will be that sexist comments will typically have a strongly negative sentiment.
Thus, if videos with female guests get a log of sexist comments, we would expect those videos to have a lower average sentiment score.

Let's briefly examine whether sentiment score is a reasonable proxy for sexism by looking at a few examples from the Chrissy Teigen episode.
We'll start with the comment with the lowest sentiment score on this video. Coming in at a whopping **-0.997** sentiment score, we have this gem (with some censoring):

> PLEASE DON'T EVER BRING A DISGUSTING UGLY SACK OF **** ON THIS SHOW AGAIN! WHY WOULD YOU BRING THAT CHIPMUNK LOOKING *** ***** ON HERE? SHE IS SO ANNOYING HER FACE IS HIDEOUS, HER VOICE IS HORRENDOUS, I PERSONALLY DON'T EVEN KNOW WHY SHE'S FAMOUS ASIDE FROM BEING MARRIED TO JL. I WISH THIS ***** WOULD ******* DIE YOU UGLY ******* ****! YOU ARE EXTREMELY DISGUSTING YOU ******* FAT HEADED SLUT WHORE ***** ****! DIE DIE DIE DIE DIE DIE DIE

Nice.
I would classify that comment as blatantly sexist.
So at a minimum, we know that extremely sexist comments can be found by looking for low sentiment scores.

However, there's one problem we know we're going to have: comments can be negative without being sexist. For example, this comment has a sentiment score of **-0.94:**

> Hell nooo eat the DAM wing. You knew you were going to Hot Ones. What. waste of wing. SHAME Delete a the episode. Retake of season 7 episode 1 SMH.

This person was apparently upset that Chrissy licked the hot sauce off the wings without eating them.
The negative sentiment score seems accurate, but this comment does not seem sexist to me.
Comments like these will add noise to our data.
Low sentiment scores will identify plenty of sexist comments, but they might identify even more comments that are negative but not sexist.

Another potential problem is the quality of the sentiment analyzer. Language is complex and modern sentiment analysis is far from perfect, so we should expect some comments to be misclassified. For example, this comment gets a sentiment score of **-0.91,** but it actually seems positive:

> Chrissy is hands down a savage!! She killed it!! Its way worse to just lick the sauce

The sentiment here is that the commenter was impressed by Chrissy's ability to handle the hot sauce, so this should be classified as a positive comment.
The sentiment analyzer disagrees, probably because of words like "savage", "killed", and "worse", which more commonly have negative connotations.

So it appears sentiment analysis gives us a decent, but definitely flawed, way of finding sexist comments.
Back to the question at hand.
Is sexism prevalent in *Hot Ones* comments?
Let's compute a "positive ratio" metric for each video, defined as the number of positive comments divided by the number of negative comments[^3].
The following plot shows the distribution of positive ratio for videos featuring male and female guests, excluding Season 1 as an outlier[^4]:

{{< figure
    src="positive_ratio_by_male_female.png"
    caption="Figure 1: Distribution of positive ratio for videos with male and female guests."
    >}}

The peak is farther to the right for male guests, indicating that videos with male guests tend to have higher positive ratios.
Sure enough, videos with female guests have an average positive ratio of 2.12 while videos with male guests have an average of 2.20.

However, that's not a big difference and our sample size is fairly small.
A t-test can help us decide whether there's any meaningful difference between the mean positive ratios for the two groups (male and female).
The t-test will return a p-value, where values lower than 0.05 are traditionally considered statistically significant.
In our case, the t-test results returns a p-value of 0.58, indicating that **we don't have a statistically significant difference between our groups.**

In summary, basic sentiment analysis might show a *tiny* amount of evidence for sexism in *Hot Ones* video comments, but the evidence isn't anywhere near definitive.

### Toxicity scores

Google has a tool called [Perspective](https://www.perspectiveapi.com/#/home) that was specifically created to identify "toxic" comments.
Perspective assigns a high toxicity score to comments that could be perceived as abuse or harassment, and sexism certainly falls into those categories.
It's conceptually similar to sentiment analysis, but with a more specific focus that fits our use case quite well.
I'll be using the Perspective "toxicity" and "severe toxicity" scores because I think those are the available options most similar to sexism.

Let's see how toxicity scores evaluate the comments from the Chrissy Teigen video quoted previously.
Remember, one of these comments is sexist and the other two are not.
Our goal is to find a metric that separates the sexist comment from the others.

{{< figure
    src="sentiment_toxicity_table_color.png"
    caption="Table 1: VADER sentiment score and Perspective toxicity scores for comments on the Chrissy Teigen video."
    >}}

As we saw earlier, sentiment score does a poor job of separating the sexist comment—the comments all have very similar sentiment scores.
The toxicity scores, especially severe toxicity, do a much better job.
The sexist comment gets a very high toxicity score while the others get lower scores (though still not all that low—toxicity scores range from 0 to 1).

To be fair, this is a somewhat cherry-picked example.
There are other examples in the dataset where toxicity score does no better than sentiment score because, much like sentiment score, toxicity score can still struggle with nuances of written language[^5].
That said, toxicity score generally seems to do a better job of separating sexist from negative-but-not-sexist comments.

Let's plot the toxicity scores for all of the videos.
The plots below show the distribution of average toxicity and severe toxicity scores[^6] for all videos, again excluding Season 1 as an outlier[^4]:

{{< figure
    src="toxicity_scores_by_male_female.png"
    caption="Figure 2: Perspective toxicity and severe toxicity scores for videos with male and female guests."
    >}}

The female distributions seem shifted to the right compared to the male distributions (although the most extreme scores for male guests extend even farther right).
Indeed, female guests have an average toxicity of 0.306 and an average severe toxicity of 0.204 while male guests have slightly lower averages of 0.297 and 0.200.

However, like with sentiment scores before, the differences are quite small.
A t-test gives a p-value of 0.36 for toxicity score and 0.69 for severe toxicity score.
Both p-values are quite far from what would traditionally be considered statistically significant, so **we can't confidently claim that toxicity scores have identified a difference between the two groups.**

Toxicity scores have left us in pretty much the same place as sentiment scores.
There's a little bit of evidence that women receive more toxic comments, but that evidence isn't very convincing from a statistical perspective.

### Word usage

Let's shift gears a bit.
We've taken a very quantitative approach so far, trying to find a metric that quantifies how sexist (or hateful, toxic, etc.) the comments are on each video.
Now let's see if we can find differences in the language used in our two groups of comments.

The general idea is simple.
For every word in our comment dataset, we want to know whether that word occurs more frequently for male or female comments.
We'll fit a model that tells us how much more (or less) likely any given word is to be used in comments on videos with female guests.
Once we have our model, we can look at the top words for each group and look for differences between them.

Specifically, I implemented the Bayesian model with a multinomial likelihood and informative Dirichlet prior described in [this paper](http://languagelog.ldc.upenn.edu/myl/Monroe.pdf) by Monroe et al.
The technical details aren't important for understanding the results, but read the paper if your eyes didn't glaze over by the end of the previous sentence—it's an elegant approach to this sort of problem.
The paper's authors used the model to identify differences in speeches from Democrats vs. Republicans, a task that's not so different from our own.

I performed some minor preprocessing steps before fitting the model such as lemmatization and removing punctuation (common techniques in NLP).
I also replaced gendered pronouns with a generic `<pronoun>` token and guests' names with a generic `<name>` token.
The generic tokens prevent those terms from dominating the results—words like "she" and "her" are used far more often in the female guest comments, but that's not an interesting result.

The table below shows the top 30 words and bigrams associated with female and male guests[^7]:

{{< figure
    src="word_usage_table.png"
    caption="Table 2: Top 30 words and bigrams for female and male guests according to the informative Dirichlet model."
    >}}

Take some time to read through those lists and see if you notice any interesting differences.
Here are a few that I see:

* The female list has a lot of words describing physical appearance like "beautiful", "cute", and "gorgeous".
  It's nice to see that the words are positive, but they can also be interpreted as objectifying. Commenters may be more likely to focus on women's physical appearance (notice how words like "handsome" aren't included for men).
* There are a few negative words in the female list, notably "annoy".
  If you read some comments on a *Hot Ones* video with a female guest, it won't take long to find a comment describing her as annoying, so I'm not surprised to see this one make the list.
* There are a lot of curse words at the top of the male list.
  I'm not quite sure what to make of this because context matters quite a bit for those words.
  A lot of those comments are presumably negative, but some of them might be inflating the male toxicity scores—those scores are unreliable when curse words are used in a positive context[^5].
* The male list has a lot of variations of "best episode ever".
  I think there's some implicit sexism here. On average, commenters seem biased in favor of episodes featuring men.
* The male list has "funniest", "laugh", and even the 😂 emoji.
  This lines up with the cultural perception that men are funnier than women (which [probably isn't true](https://slate.com/human-interest/2011/10/study-shows-that-men-aren-t-funnier-than-women-but-that-people-generally-believe-that-they-are.html)).

Let's take a deeper dive on that last bullet point.
The table below shows some "funny" bigrams[^7] and their corresponding z-scores from the model, which tell us how much more common the word is in male or female comments.

{{< figure
    src="funny_table.png"
    caption="Table 3: A deeper look at \"funny\" comments."
    >}}

There have been plenty of funny women featured on *Hot Ones*, but it's clear that commenters, on average, find male guests to be funnier than female guests.
The model even associates "unfunny" and "not funny" with female guests.
It's hard to prove, but I think there's a hint of sexism here.
I doubt many commenters are intentionally proclaiming that men are funnier than women, but there does seem to be some subconscious bias.

## Conclusion

So did we find evidence of sexism in *Hot Ones* comments?
Sort of, but it's not overwhelming.
Sentiment analysis and toxicity scores offer a tiny bit of evidence, but it can easily be dismissed as statistically insignificant.
Word usage analysis illuminates some lexical differences between comments on male and female videos.
Those differences seem a bit sexist, but they're also a open to interpretation.

If pressed, I would say yes, there is evidence of sexism in *Hot Ones* comments.
I think the word usage analysis convincingly identifies a few sexist themes.
Do you disagree?
Am I falling victim to confirmation bias?



[^1]: Specifically, my dataset contains all comments before the date that I scraped them in the middle of May 2019.
I'm only including base-level comments, i.e., no replies to comments.
I also excluded a few videos from the analysis: the holiday special in season 2 (does not feature any guests), the Stephen Colbert Late Show episode (not on the *Hot Ones* channel, so presumably a different audience), and the Mario Batali episode (not available on YouTube).
I wrote a Python script that accesses [this web scraper](http://ytcomments.klostermann.ca/) to pull the comment data (Google provides an API, but it's limited to 10,000 comments per day).

[^2]: I used the VADER sentiment analysis model, a rule-based model designed for social media text.
Original paper is [here](http://comp.social.gatech.edu/papers/icwsm14.vader.hutto.pdf).

[^3]: The positive ratio metric is described in more detail in the [accompanying Jupyter notebook](https://github.com/djcunningham0/hot-ones-sexism-analysis/blob/master/data_for_writeup.ipynb).

[^4]: Season 1 is excluded from this plot because I'm treating it as an outlier.
See the [accompanying Jupyter notebook](https://github.com/djcunningham0/hot-ones-sexism-analysis/blob/master/data_for_writeup.ipynb) for justification.

[^5]: For example, curse words almost always result in a high toxicity score even when there isn't really a toxic or hateful sentiment.
See Table 7 in the [Gröndahl et al. paper](https://arxiv.org/pdf/1808.09115.pdf) mentioned previously.

[^6]: For sentiment score we used the positive ratio metric because the majority of comments were scored with exactly neutral sentiment (score = 0).
We don't have the same issue with toxicity scores so it's simpler to use average toxicity score as our evaluation metric.

[^7]: The lists are very lightly edited to give a better sample of words.
I didn't shuffle the lists at all, but I did remove some words that were very similar to others that appeared higher in the list.
The full results are available [on GitHub](https://github.com/djcunningham0/hot-ones-sexism-analysis/tree/master/data).