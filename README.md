![Project screenshot](./screenshot.png)

# Unix Timestamp Converter

Convert Unix timestamps into readable dates, or translate a calendar date into epoch seconds and milliseconds. The live clock, local timezone, UTC result, and ISO 8601 value stay together so it is clear which moment each format represents.

**Live app:** [https://a2rp.github.io/unix-timestamp-converter/](https://a2rp.github.io/unix-timestamp-converter/)

## Features

- A live local clock that refreshes every second, with copyable current Unix seconds and milliseconds.
- Timestamp-to-date conversion with automatic unit detection, or an explicit seconds/milliseconds selector.
- Date-to-timestamp conversion using a local `datetime-local` input.
- Readable local date and time, timezone abbreviation, relative time, UTC text, and ISO 8601 output.
- Both seconds and milliseconds when converting a date to an epoch value. Fractional seconds are retained to millisecond precision.
- Copy buttons for current time, ISO and UTC date strings, seconds, and milliseconds.
- Quick examples for the current moment, the Unix epoch, and Y2K.
- Responsive layout, fixed section navigation, repository link, format guide, shared footer, and Back to top button.

## Use the converter

Choose **Timestamp to date** and enter a number. Automatic mode reads values with an absolute value below 100 billion as seconds and larger values as milliseconds. Select a unit explicitly when a timestamp falls outside that heuristic. Negative and fractional second values are supported. Input must be a numeric value with an optional decimal point and leading minus sign.

The result shows the local date and timezone, relative time, UTC string, and ISO 8601 string. Use a copy button to copy a particular representation.

Choose **Date to timestamp** to enter a local calendar date and time. The browser's local timezone is used to interpret the input. The result includes epoch seconds and milliseconds, with the matching UTC time and timezone shown beneath them. Quick examples can fill either input without changing the other conversion direction.

## Date range and storage

Dates use the JavaScript `Date` range, up to 8.64 quadrillion milliseconds from the epoch in either direction. Empty, malformed, non-numeric, and out-of-range timestamp values show an explanation instead of a converted result.

Values are held in page memory only. Nothing is uploaded or saved between sessions. Reloading restores a current timestamp and the local date and time at page load.

## Run locally

Use Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Run tests, ESLint, and the production build with:

```sh
npm test
npm run lint
npm run build
```

Deploy to GitHub Pages with:

```sh
npm run deploy
```

The deploy script builds the app first and publishes `dist` to the `gh-pages` branch. Vite is configured for [https://a2rp.github.io/unix-timestamp-converter/](https://a2rp.github.io/unix-timestamp-converter/).

## Future improvements

These are ideas and are not implemented yet:

- Add named timezone selection for viewing a timestamp in another region.
- Add a calendar picker for dates far outside the native input's convenient range.
- Add a compact table of common epoch reference values.

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [mailto:ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me a Coffee: [https://buymeacoffee.com/ashishranjan](https://buymeacoffee.com/ashishranjan)
- Patreon: [https://www.patreon.com/ashishranjan](https://www.patreon.com/ashishranjan)
