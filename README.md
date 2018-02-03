# React Accounts UI for using Material-UI

Fork of the apparently unmaintained [Zetoff/accounts-material-ui](https://github.com/Zetoff/accounts-material-ui), with react 16 and material-ui v1 support.
Based on the work of [yanickrochon/accounts-material-ui](https://github.com/yanickrochon/accounts-material-ui/tree/material-ui-v1) and [ensemblebd/accounts-material-ui](https://github.com/ensemblebd/accounts-material-ui).

This might be buggy. Feel free to send me a pull request, if you encounter something strange..

![React Accounts UI for using Material-UI](https://raw.githubusercontent.com/Zetoff/accounts-material-ui/master/accounts-material-ui.png)

### Based on and extends ensemblebd fork of std:accounts-ui

[https://github.com/ensemblebd/accounts-ui](https://github.com/ensemblebd/accounts-ui)

## Installation

Create a `packages` folder in the root of your meteor project. Then clone this repository there. Meteor will use the local repo in favor of the atmosphere package provided by zetoff.

### Dependencies

In addition to React this package also depends on [material-ui](https://github.com/mui-org/material-ui). So make sure it is installed:

`meteor npm install -S material-ui@next`

## Configuration

We support the standard [configuration in the account-ui package](http://docs.meteor.com/#/full/accounts_ui_config). But have extended with some new options.

### [Accounts.ui.config(options)](https://github.com/studiointeract/react-accounts-ui#configuration)

### Example setup (Meteor 1.3)

`meteor add accounts-password`
`meteor npm install -S material-ui@next`
`mkdir packages && cd packages`
`git clone git@github.com:shoetten/accounts-material-ui.git`

```javascript

import React from 'react';
import { Accounts } from 'meteor/std:accounts-ui';

Accounts.ui.config({
  passwordSignupFields: 'NO_PASSWORD',
  loginPath: '/',
});

if (Meteor.isClient) {
  ReactDOM.render(<Accounts.ui.LoginForm />, document.body)
}

```

## Example setup using FlowRouter (Meteor 1.3)

`meteor add accounts-password`
`meteor add zetoff:accounts-material-ui`
`meteor npm install -S material-ui`

```javascript
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { Accounts } from 'meteor/std:accounts-ui';
import React from 'react';

Accounts.ui.config({
  passwordSignupFields: 'NO_PASSWORD',
  loginPath: '/login',
  onSignedInHook: () => FlowRouter.go('/'),
  onSignedOutHook: () => FlowRouter.go('/')
});

FlowRouter.route("/login", {
  action(params) {
    mount(MainLayout, {
      content: <Accounts.ui.LoginForm />
    });
  }
});
```

## Credits

Originally made by Zetoff
