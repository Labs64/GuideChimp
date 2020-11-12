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
    description: 'Thank you {username} for choosing {productName}!',
    // step placeholders
    placeholders: {
      id: 'main'
    }
  },
  /* Output:
   * {
   *      element: '#logo-main',
   *      title: 'Thank you John Doe',
   *      description: 'Thank you John Doe for choosing GuideChimp!',
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

In the case, action needs to be performed before a placeholder object is set and the placeholders values will be available after AJAX query, step property placeholders can be defined in a function.

```javascript
var tour = [{
    title: 'Hello {username}',
    description: 'Thank you for choosing {productName}!',
    // step placeholders as function
    placeholders() {
      // Wait for promises
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
   *      description: 'Thank you for choosing GuideChimp!',
   * }
   */
]

var guide = GuideChimp(tour);
guide.addPlaceholder('productName', 'GuideChimp');
```

#### Placeholder template

Sometimes it is necessary to change the template of a placeholder, for instance, if placeholder format conflicts with other libraries or frameworks. In this case, a new placeholder template can be defined in the plugin options.

```javascript
GuideChimp.extend(guideChimpPluginPlaceholders, {
  template: '%*%'
});

var tour = [
  {
    title: 'Welcome to %companyName%',
    description: 'Welcome to %companyName%',
    placeholders: {
      companyName: 'BestCompany'
    }
  }
]

var guide = GuideChimp(tour);
```

### Examples

- Placeholders plugin example at CodePen - https://codepen.io/netlicensing/full/GRqPxrL
