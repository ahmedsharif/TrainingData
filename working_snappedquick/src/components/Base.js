const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg)$/)
);
const users = importAll(
  require.context("./images/users", false, /\.(png|jpe?g|svg)$/)
);

export { byPropKey, images, users };
