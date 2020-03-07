# React Occupy

> If we see ‘lines of code’ as ‘lines spent’, then when we delete lines of code, we are lowering the cost of maintenance. Instead of building re-usable software, we should try to build disposable software.

⛱ [StoryBook with source code](https://polmoneys.github.io/react-occupy)

Let users find their place in the world. `<Occupy/>` is a React component for managing the logic of selecting a spot while staying open for composition. It handles focus, keyboard, and provides a11y friendly labels.

## Occupy

| Prop name       |    Accepts    | Default |
| :-------------- | :-----------: | ------: |
| rowCount        |    number     |    null |
| spotCount       |    number     |    null |
| shape           |     array     |    null |
| initialState    |      obj      |      {} |
| initialRowIndex |    number     |       1 |
| spotComponent   | React element |    null |
| multi           |     bool      |   false |

**rowCount** is the amount of rows, for composing multiple `<Occupy>` use **initialRowIndex** as [in this demo](https://polmoneys.github.io/react-occupy/docs/?path=/story/default--case-a)

Both **rowCount** and **spotCount** can be controlled from the outside and will re-render as you'd expect.

If your need has a repeatable pattern **shape** can help achieve it swiftly as [in this demo](https://polmoneys.github.io/react-occupy/docs/?path=/story/shaped--case-a)

**multi** allows for multiple spot selections, as [in this demo](https://polmoneys.github.io/react-occupy/docs/?path=/story/advanced-composition--case-b)

`<Occupy>` leaves up to you how to achieve your needs by providing a render prop with the info you need to create your own `<Log>`component, validate availability, lift state up...as [in this demo](https://polmoneys.github.io/react-occupy/docs/?path=/story/advanced-composition--case-a)

```javascript
      props.children({
          select,
          selected
        })}
```

**spotComponent** is how you plug your own React element into the dance. As [in this demo](https://polmoneys.github.io/react-occupy/docs/?path=/story/default--case-b), it will decorate your component with the following props:

```javascript
let {
  a11yTitle, // provide an .offscreen label
  cb, // assign it to onClick
  id, // needed for managing focus && keyboard
  isBusy = false, // read below, checks busySpots.inclues(id) use it to disable button
  isLast = false, // provide a marginRight style for shaped rows
  isSelected = false // hook for styling
} = props;
```

**initialState** opens the door to a couple of features, one still in the works (think suggestions) and the one you can use right now: provide an array of **busySpots** in the shape of ROW-SPOT to disable it's selection.

## DIY

DIY branch lets you build any complex spot layout as [in this demo](https://polmoneys.github.io/react-occupy/docs/?path=/story/diy-layouts--case-a) or [this one](https://polmoneys.github.io/react-occupy/docs/?path=/story/diy-layouts--case-b).

## License

[MIT](https://mit-license.org)
