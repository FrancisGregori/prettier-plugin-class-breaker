# Prettier Class Breaker Plugin

## Overview

The Prettier Class Breaker Plugin is a simple yet effective custom Prettier plugin designed to improve the formatting of JSX class names within your codebase. Specifically, it preprocesses `className` attributes in JSX, converting them into template literals when necessary. This approach allows the plugin to break long strings of CSS classes into multiple lines, thereby enhancing the readability and maintainability of your code. The plugin is straightforward in its current implementation, with ample scope for future enhancements and support for additional features.


## Features

- **Custom Line Breaks:** Configure after how many classes a new line should be inserted.
- **Indentation Control:** Choose between tabs or spaces for indentation, and set the desired size.
- **Integration with Existing Tools:** Works seamlessly with existing Prettier configurations.

## Installation

First, install the plugin via npm:

```bash
npm install prettier-class-breaker-plugin --save-dev
```
or
```bash
yarn add -D prettier-class-breaker-plugin
```

## Adding the Plugin to Prettier Configuration

After installing the Prettier Class Breaker Plugin, you need to add it to your Prettier configuration. This step ensures that Prettier uses the plugin when formatting your code. Here's how you can do it:

1. Open your Prettier configuration file (`.prettierrc`, `.prettierrc.js`, or `prettier.config.js`).

2. Add the plugin to the `plugins` array in the configuration. It's important to add this plugin as the last one in the list to ensure it works correctly with other plugins.

Example using `.prettierrc.js`:

```javascript
module.exports = {
  // ... your other Prettier configuration options ...
  plugins: [
    // ... other plugins ...
    'prettier-class-breaker-plugin'
  ],
};
```

> Note: Make sure to list the prettier-class-breaker-plugin as the last plugin in the plugins array. This order is crucial for the plugin to function properly.

## Configuration

To configure the plugin, create a `.classbreakerrs` file in your project root. Below are the available configuration options:

| Option                | Description                               | Required | Default Value |
|-----------------------|-------------------------------------------|:--------:|:-------------:|
| `classesPerLine`      | Number of classes per line before breaking| No       | 1             |
| `lineBreakAfterClasses`| Number of classes after which a line break is inserted | No       | 5             |
| `indentStyle`         | Indentation style ('tab' or 'space')      | No       | 'space'       |
| `indentSize`          | Size of the indentation                   | No       | 4             |

Here's an example of the `.classbreakerrs` file:

```json
{
  "classesPerLine": 3,
  "lineBreakAfterClasses": 10,
  "indentStyle": "space",
  "indentSize": 2
}
```

- `classesPerLine`: Number of classes per line before breaking.
- `lineBreakAfterClasses`: Number of classes after which a line break is inserted.
- `indentStyle`: Indentation style ('tab' or 'space').
- `indentSize`: Size of the indentation.

These settings can be customized to fit your coding style and preferences.

## Usage

After installation and configuration, run Prettier as you normally would:

```bash
prettier --write .
```

## Example Usage

### Before Formatting:

```html
<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <img className="h-64 w-full object-cover" src="image.jpg" alt="Card Image" />
    <div className="text-gray-700 text-base px-4 py-2 m-2">Lorem ipsum dolor sit amet...</div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button>
</div>
```

### After Formatting with Class Breaker Plugin:

```jsx
<div
    className={`
          bg-white
          shadow-md
          rounded
          px-8
          pt-6
          pb-8
          mb-4
          flex
          flex-col
          my-2
      `}>
    <img
        className="h-64 w-full object-cover"
        src="image.jpg"
        alt="Card Image"
    />
    <div className="text-gray-700 text-base px-4 py-2 m-2">
        Lorem ipsum dolor sit amet...
    </div>
    <button
        className={`
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
       `}>
        Button
    </button>
</div>
```

### Configuration used in the example
```json
{
  "classesPerLine": 1,
  "lineBreakAfterClasses": 6,
  "indentStyle": "space",
  "indentSize": 4
}
```

## Contributing

Contributions to the Prettier Class Breaker Plugin are welcome. Feel free to open issues or submit pull requests.

## License

This plugin is released under the [MIT License](LICENSE).

