## Placeholders

Use dynamic placeholders in the tour definition.

### Use Cases

- Define dynamic placeholders for tour steps; e.g. _"Hello User!"_
- Describe dynamically created elements

### Installation

Please refer to the plugins' installation and configuration Wiki [page](https://github.com/Labs64/GuideChimp/wiki/Configure#plugins).

### Options

- `template` (string): redefine placeholder template, in case the standard template conflicts with other libraries or frameworks


### Methods

- `setPlaceholders(placeholders)` - set (overwrite) global placeholders
    - `placeholders` (Object) - placeholders object
- `addPlaceholder(key, value)` - add global placeholder
    - `key` (string) - placeholder key (without braces)
    - `value` (string or number) - placeholder value
- `addPlaceholders(placeholders)` - add global placeholders
    - `placeholders` (Object) - key:value object
- `removePlaceholder(key)` - remove global placeholder
    - `key` (string) - placeholder key
- `removePlaceholders(keys)` - remove global placeholders
    - `keys` (Array or null) - an array of placeholder keys; if not specified, all global placeholders will be removed

### How To Use

The plugin allows you to define both global placeholders and placeholders for a specific step.

```javascript
var tour = [
  {
    title: 'Welcome to {companyName}',
    description: 'Welcome to {companyName}',
  },
  /* Output:
   * { 
   *      title: 'Welcome to Labs64',
   *      description: 'Welcome to Labs64',
   * }
   */
  {
    element: '#logo-{id}',
    title: 'Thank you {username}',
    description: 'Thank you {username} for choising {productName}!',
    // step placeholders
    placeholders: {
      id: 'main'
    }
  },
  /* Output:
   * {
   *      element: '#logo-main',
   *      title: 'Thank you John Doe',
   *      description: 'Thank you John Doe for choising GuideChimp!',
   * }
   */
]

var guide = GuideChimp(tour);

// global placeholders
guide.setPlaceholders({
  username: 'John Doe',
  companyName: 'Labs64',
  productName: 'GuideChimp',
});

```
**NOTE:** Step placeholder key overrides the global placeholder key with the same key value.

#### Asynchronous fetching of placeholders

It often happens that you need to perform some action before you can return a placeholder object. For example, get the values of placeholders after ajax query. In such cases, it will be convenient to use the step property `placeholders` as a function.

```javascript
var tour = [{
    title: 'Hello {username}',
    description: 'We are glad that you have used the services of the {companyName} company',
    // step placeholders as function
    placeholders() {
      // GuideChimp will wait for promises to end
      return fetch('http://jsonplaceholder.typicode.com/users/1')
        .then((response) => {
          return response.json();
        })
        .then((user) => {
          return {
            username: user.name
          };
        });
    }
  },
  /* Output:
   * {
   *      title: 'Hello Leanne Graham',
   *      description: 'We are glad that you have used the services of the BestCompany company',
   * }
   */
]

var guide = GuideChimp(tour);

guide.addPlaceholder('companyName', 'BestCompany');
```

#### Placeholder template

Sometimes it is necessary to change the template of a placeholder, for example when it conflicts with other libraries or frameworks. To do this, you can pass a new placeholder template in the plugin options.
```javascript
GuideChimp.extend(guideChimpPluginPlaceholders, {
  template: '%*%'
});

var tour = [{
  title: 'Welcome to %companyName%',
  description: 'We are glad to welcome you to the site of an %companyName% company, take this tour to get acquainted with the product.',
  placeholders: {
    companyName: 'BestCompany'
  },
}, ]

var guide = GuideChimp(tour);
```

### Examples

- Placeholders plugin example at CodePen - https://codepen.io/netlicensing/full/TODO
