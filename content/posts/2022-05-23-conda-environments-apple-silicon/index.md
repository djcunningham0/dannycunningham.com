+++
title = "How to Manage Conda Environments on an Apple Silicon M1 Mac"
subtitle = "Manage both ARM64 and x86 Python environments using conda"
date = 2022-05-23
tags = ["environment management"]
draft = false
description = "A basic tutorial for managing Python environments using conda (for those who don't like pyenv, or when pyenv isn't sufficient)."
+++

<small>
<i>I originally wrote this post <a href="https://medium.com/@djcunningham0">on Towards Data Science</a> before moving it here.</i>
</small>

This article describes how to manage both ARM64 and x86 Python environments using conda.
To accomplish the same thing using pyenv (my preferred tool) and virtual environments, see my [other post]({{< relref "posts/2022-02-17-python-versions-apple-silicon" >}}).

---

If you work with Python enough you'll eventually need to manage environments with different Python versions.
When starting new projects you'll want to take advantage of the latest features ([Python 3.10](https://docs.python.org/3/whatsnew/3.10.html) was recently released!), but you'll also need to maintain older projects that use previous versions.
I encounter this problem frequently as a data scientist—I frequently return to old projects and code, so I need an easy way to manage multiple environments with different Python versions.

That's where conda comes in.
Conda is a very popular package and environment management tool (we'll be discussing the environment management aspect).
It allows you to maintain separate environments for different projects—each environment can contain different packages, different package versions, and even different Python versions—and it's quick and easy to switch between them.

*Note: this article is geared towards Mac users, and especially Apple Silicon Mac users, but the basic conda instructions will work on all platforms.*

## Creating Python environments using conda

Follow these instructions to install conda and get started with environments.

### 1. Install conda

There are several flavors of conda available, a few of which are described below.
Follow the hyperlinks to find the installation instructions.
Each installer will provide you with the same environment management tools.
**If you're not sure which one to install, just choose Miniforge.**

* **[Miniforge](https://github.com/conda-forge/miniforge)** *(my recommendation):* a community-driven project that supports a variety of system architectures.
  It creates minimal conda environments similar to Miniconda (see next bullet point).
* **[Miniconda](https://docs.conda.io/en/latest/miniconda.html):** the official minimal installer for conda.
  It creates minimal conda environments without installing any packages automatically.
* **[Anaconda](https://docs.anaconda.com/anaconda/install/index.html):** the original conda distribution.
  It automatically installs a lot of Python packages into new conda environments, so it tends to create large and bloated environments.
  *I do **not** recommend Anaconda for most use cases.*

### 2. Create a conda environment

Creating conda environments is easy.
To create a new conda environment with a specific version of Python (in this example, Python 3.9), run this line from your terminal:

```bash
conda create -n myenv python=3.9
```

That command will create a new conda environment called `myenv`.
To activate the conda environment, run `conda activate myenv` (you can view a list of all of your conda environments with `conda env list`).
Once the environment is activated you can install Python packages using `conda install` or `pip install`.
`conda install` does a more thorough job managing package version of dependencies, but you'll have to use `pip install` for packages that are not available through conda.

The full documentation for managing conda environments is linked [here](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html).

## Additional challenges with Apple Silicon Macs

The steps above will almost always be sufficient.
However, with the newer Macs (personally, I use an M1 MacBook Air) you might run into issues when installing certain packages.
When Apple switched from Intel chips to their in-house Apple Silicon chips, they changed from x86 architecture to ARM64 architecture.
This is mostly a good thing—the only difference you'll notice in day-to-day usage is that the new chips are faster and more efficient than the old ones.

Unfortunately, you might occasionally encounter package compatibility issues.
Some Python packages are not yet supported on Apple's ARM64 architecture—for example, I ran into that problem with the `ortools` package.
You'll get errors during installation and you won't be able to use the package in your code.
Eventually the problem should go away when developers add ARM64 support for their packages, but you're going to have find another solution in the meantime.

---

*(If you're reading this post now, you're unlikely to encounter this sort of package compatibility issue on an Apple Silicon Mac.
When I first published this post, Apple Silicon was fairly new and many packages hadn't been updated to support it.
Now, years later, all major packages are likely to be compatible with Apple Silicon.
In that case, the rest of this post will be of little utility to you.
But you might enjoy reading about the hoops we occasionally had to jump through way back in the early 2020s!)*

---

Fortunately, conda offers an easy short term solution: **you can easily create conda environments with x86 architecture on an Apple Silicon Mac.**
It's easy and doesn't require installing any additional software.

## Creating conda environments with x86 architecture

Only follow these steps if you need to use packages that only work on x86 architecture.
Try the previous steps first, and only come here if you encounter package installation issues.
Otherwise you are sacrificing performance for no benefit.

### 1. Install conda (if you haven't already)

Follow the same instructions as Step 1 in the previous section.
You *do not* need to install a separate version of conda to work with x86 environments.

### 2. Create a conda environment

This is where the instructions are a bit different, but only a little bit.
We just need to tell conda that we want to our environment to use x86 architecture rather than the native ARM64 architecture.
We can do that with following lines of code, which create and activate a new conda environment called `myenv_x86`:

```bash
CONDA_SUBDIR=osx-64 conda create -n myenv_x86 python=3.9
conda activate myenv_x86
conda config --env --set subdir osx-64
```

The first line creates the environment.
We simply set the `CONDA_SUBDIR` environment variable to indicate that conda should create the environment with an x86 Python executable.
The second line activates the environment, and the third line ensures that conda installs x86 versions of Python packages into the environment.

I created a simple shell function in my ~/.zshrc file so I don't need to remember the exact commands every time I create a new x86 environment:

```bash
### add this to ~/.zshrc (or ~/.bashrc if you're using Bash)
create_x86_conda_environment () {
  # create a conda environment using x86 architecture
  # first argument is environment name, all subsequent arguments will be passed
  # to `conda create`
  # example usage: create_x86_conda_environment myenv_x86 python=3.9

  CONDA_SUBDIR=osx-64 conda create -n $@
  conda activate $1
  conda config --env --set subdir osx-64
}
```

And that's it!
Once you've created your x86 environment it works exactly the same way as a regular conda environment using the default system architecture.
Simply start installing packages and you're good to go!

---

If you're an Apple Silicon Mac user you're likely to run into package installation issues occasionally.
Eventually those issues should go away after developers have had enough time to add ARM64 support to their packages, but that could take a couple years for smaller, niche packages.
In the meantime I hope this post saves you some troubleshooting!
