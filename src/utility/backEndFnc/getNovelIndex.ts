export const getNovelIndex = async (novelId: string | undefined | null) => {
  console.log(novelId);
  const promise = new Promise((ress) => {
    setTimeout(() => {
      ress("d");
    }, 1000);
  });
  const arr = [
    { title: "Introduction to React", locked: false },
    { title: "Components and Props", locked: false },
    { title: "State and Lifecycle", locked: false },
    { title: "Handling Events", locked: true },
    { title: "Conditional Rendering", locked: true },
    { title: "Lists and Keys", locked: true },
    { title: "Forms in React", locked: true },
    { title: "Lifting State Up", locked: true },
    { title: "Composition vs Inheritance", locked: true },
    { title: "React Hooks", locked: true },
  ];
  await promise;
  return arr;
};
