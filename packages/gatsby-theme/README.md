# @mdx-deck/gatsby-theme

**WIP** A Gatsby theme for adding MDX Decks to your Gatsby site

```sh
npm i @mdx-deck/gatsby-theme
```

_Note:_ This theme requires MDX v1, which is currently in beta, and will not work with previous versions of MDX

```js
// gatsby-config.js
module.exports = {
  __experimentalThemes: ['@mdx-deck/gatsby-theme'],
}
```

Add MDX Decks to the `src/decks/` directory.

```mdx
# Hello!

---

## Beep
```

## Using Layouts

Slide layout components must be rendered inline, _not_ using the default export syntax.

```mdx
import Layout from './my-layout'

<Layout>

# Hello Layout

</Layout>
```

MIT License
