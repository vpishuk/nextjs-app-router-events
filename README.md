[![Release Train](https://github.com/vpishuk/nextjs-app-router-events/actions/workflows/main.yaml/badge.svg?branch=main)](https://github.com/vpishuk/nextjs-app-router-events/actions/workflows/main.yaml)

# nextjs-app-router-events

This module offers a simple wrapper for [NextJS](https://nextjs.org/)'s app router that provides ability to subscribe to navigation events.

## Installation

Run the following command to install timer in your repository:

```
npm i nextjs-app-router-events
```

## Usage

1. Wrap your application by AppRouterEventsContextProvider

```
<AppRouterEventsContextProvider>
    <App />
</AppRouterEventsContextProvider>
```

2. Use a hook: `useAppRouterEvents` to get access to the extended router

3. Subscribe to `beforeNavigate`

```
const {subscribe} = useAppRouterEvents();

useEffect(() => {
    const listener = () => console.log('Navigation is going to happen.');
    const unsubscribe = subscribe('beforeNavigate', listener);

    return () => {
        unsubscribe();
    };
}, [subscribe])

```

## Contribution guidelines

You are encouraged to contribute to this project as soon as you see any defects or issues.

## Code Editor Configuration

This repository contains configuration for VSCode editor. It doesn't mean that you cannot use a different tool. Feel free to push configurations for your favourite code editor.

## Commands

1. To build : `npm run build`
2. To lint use: `npm run lint`
3. To initialize pre-commit hooks use: `npm run prepare`

## Workflow

Before you get started make sure that there is noone working on an issue you are going to address.

As a first step, clone the repository and run `npm i && npm run prepare` command to install all dependencies and initialize pre-commit hooks.

Create a branch to work on your code changes.

Once you are done with coding, create pull request and get an approval.

Lastly, enjoy your changes.
