const main = (doc: Document = document) => {
  const element = doc.getElementById("canvas");

  if (element === null) {
    throw "Canvas element not found";
  }
};

main();
