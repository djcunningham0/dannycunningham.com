+++
title = "Using FastAPI to Recreate the Flask Tutorial"
date = 2021-11-08
tags = ["coding", "web apps", "learning", "flask", "fastapi"]
draft = false
description = "I wanted to try out the popular FastAPI framework. As a learning exercise, I reproduced a simple Flask tutorial using FastAPI."
+++

<small>
<i>I originally wrote this post <a href="https://medium.com/@djcunningham0">on Towards Data Science</a> before moving it here.</i>
</small>

Flask and FastAPI are two popular Python web frameworks.
It's easy to find tons of comparisons of the two frameworks online — if you're reading this post you've probably already read your share of "Flask vs. FastAPI” articles.

Here's a very quick summary.
Flask has been around longer and is geared towards small web apps.
Being the older framework, it tends to have a larger user base and more tutorials and answered questions.
FastAPI is newer and is geared towards creating REST APIs.
It's quickly growing in popularity, especially for machine learning use cases.
But generally both frameworks are very similar—anything you can do with Flask can probably be done with FastAPI and vice versa.

One thing Flask has is [a great beginner tutorial](https://flask.palletsprojects.com/en/2.0.x/tutorial/index.html) for building a simple app where users can register, log in, and create posts.
FastAPI has good documentation for building APIs, but it's lacking a simple tutorial for a basic app like the Flask example.
I'm in the process of learning both frameworks, so I decided it would be a good exercise to recreate the Flask tutorial app using FastAPI.
I thought other beginners might benefit from what I learned.

## How to get the most out of this post

1. **View the [source code on GitHub](https://github.com/djcunningham0/fastapi_flask_tutorial).**
   I'm not writing a full tutorial here.
   I'll call out some key differences between the Flask and FastAPI apps, but you'll have to go to GitHub to see the full source code and how everything fits together.
2. **Read the [Flask tutorial](https://flask.palletsprojects.com/en/2.0.x/tutorial/).**
   It explains the app we're building, plus there's a lot of good information in the tutorial that isn't framework specific.
   If you're already familiar with web frameworks you can just skim the tutorial, but if you're brand new it might be beneficial to complete it (it'll only take a couple hours, max).
3. **Do it yourself!**
   Code the app from scratch, start from Flask example and convert it to FastAPI, or clone my GitHub repository tinker with it.
   The best way to learn is by doing!

## The tutorial app

In the Flask tutorial we built an app called Flaskr.
I built an equivalent app using FastAPI and called it Fastr.
Both apps allow users to register with a username and password, log in, and make posts in a blog format.
The apps run on top of a SQLite database which stores user and post data.

{{< figure
    src="homepage_screenshots.png"
    caption="The same web app created using Flask (left) and FastAPI (right)."
    >}}

## Differences between the Flask and FastAPI apps

Other than the superficial changes you can see in the fonts and colors, there are some key differences between the way the apps are implemented behind the scenes.
I'll highlight some of them here, approximately in order of where you'd encounter them in the Flask tutorial.
I won't get too technical in this article so be sure to reference the [source code on GitHub](https://github.com/djcunningham0/fastapi_flask_tutorial) for more details.

This isn't a complete list, but here are some key differences between the Flask tutorial app and my implementation in FastAPI:
* **No application factory.**
  The Flask tutorial recommends implementing an “[application factory](https://flask.palletsprojects.com/en/2.0.x/tutorial/factory/#the-application-factory)” in the `__init__.py` file.
  I typically don't like putting much code in `__init__.py` files so I created the FastAPI app object inside the `main.py` file, which is a typical pattern in FastAPI documentation.
* **Run with uvicorn.**
  In Flask, we set some environment variables and then call `flask run`.
  FastAPI recommends using uvicorn, so we run our app with `uvicorn fastr.main:app`.
* **Different names for the same thing.**
  Some parts of the code are nearly identical, just with slightly different naming conventions.
  For example, a `Blueprint` in Flask is equivalent to an `APIRouter` in FastAPI, and the usage is nearly identical.
* **Fill in the missing pieces.**
  Flask has a lot of functionality built in, and some of that functionality is missing from a bare-bones FastAPI app.
  We need manually mount the [static files](https://fastapi.tiangolo.com/tutorial/static-files/) and specify our [templates engine](https://fastapi.tiangolo.com/advanced/templates/) (both of those were done automatically in Flask).
  We also don't have a `session` object built in like we did in Flask—we need to use the `SessionMiddleware` object for that functionality.
  Once we add those pieces they behave nearly the same between frameworks.
* **Pydantic models and type checking.**
  FastAPI is tightly integrated with Python type hints and `Pydantic` data models, which allows for a lot of automatic data validation.
  For example, we don't need to explicitly validate that a "username" field is populated like we did in Flask.
* **A more robust database implementation.**
  This wasn't a strictly necessary change, but I implemented the backend database using SQLAlchemy rather than directly using sqlite.
  This is the pattern recommended in the [FastAPI documentation](https://fastapi.tiangolo.com/tutorial/sql-databases/) and it has some benefits, such as allowing us to easily change to a different database backend later (e.g., from sqlite to PostgreSQL).
  This change required some code reorganization — the Fastr app has all database-related code under the `db/` directory.
* **Rewrite the tests.**
  This was one of the trickier parts since the setup for the Flaskr unit tests was pretty specific to the Flask framework.
  First we need to change the fixtures for setting up the test database and app in the `conftest.py` file.
  After that we largely run the same tests for the Flask and FastAPI apps, but the syntax and expected responses are different in some of the tests.
  Many of the changes are a result of using SQLAlchemy in the FastAPI app.
  If you run the unit tests for the Fastr app you'll find that they pass with full coverage.

## Wrapping up

If you compare the source code for the [Flask tutorial app](https://github.com/pallets/flask/tree/main/examples/tutorial) and [my FastAPI implementation](https://github.com/djcunningham0/fastapi_flask_tutorial), you'll see that they're more similar than they are different.
There's a bit more boilerplate code in the FastAPI app to replicate some of the functionality that comes built in with Flask.
But you also get some of the benefits of FastAPI, such as data validation from type hints and [automatically generated interactive documentation](https://fastapi.tiangolo.com/features/#automatic-docs).

Would I recommend Flask or FastAPI for this type of app?
I don't know.
For something so simple it doesn't really matter.
Once we start adding more functionality we might benefit from one framework more than the other.
For example, if we want to add support for asynchronous requests, FastAPI [includes that capability natively](https://fastapi.tiangolo.com/async/).
Or if we have a specific and complex feature we want to implement quickly, we might have better luck finding a starting point in the huge number of [Flask community examples](https://www.fullstackpython.com/flask-code-examples.html).
Ultimately, either one can get the job done and it's easy to transfer your knowledge from one to the other.