export interface GetContentReturn {
  topic: string;
  content: string;
}

export async function getContent(novelId: string, chapter: number): Promise<GetContentReturn> {
  console.log(novelId, chapter);
  const promise = new Promise((ress) => {
    setTimeout(() => {
      ress("d");
    }, 1000);
  });
  await promise;
  const res = {
    topic: "This is Topic",
    content: `
    honghai City, Longyang County.
As the top three top-tier cities in China and a well-known international metropolis, Zhonghai City is located at the estuary of the sea, backed by the vast inland, facing the sea, where countless trade ships gather here, making it a top city in the world.
Therefore, in the county under the jurisdiction of Zhonghai City, everyone sharpened their heads and squeezed into Zhonghai City.
People who stay in Longyang County are all crooked melons and jujubes, and they belong to the category of people who eat and wait to die.

On February 15th, Zhicai School, mock exam.

"Student Li Yun, wake up!"

The invigilator, who is also the physics teacher of Class 14, knocked on the table of a boy who was sleeping on the table with a helpless expression.
The next semester of high school just started, the school organized a school mock exam, the purpose is to let students enter the state of preparation for the college entrance examination as soon as possible.
Of course, the purpose of this mock exam is not for the students of Class 14. Class 14 is a poor class. It belongs to a group of hopeless students. The school has long given up and only asks them to pass the exam and obtain a diploma. Just don't make any trouble.
But this boy named Li Yun was too presumptuous, and went to sleep on his stomach during the exam.
Physics teachers can ignore those who crane their necks and want to peek at other people's answers, because this classroom is full of poor students and they can't copy them if they want to.
But if the inspected leader sees a sleeping examinee, his invigilator will inevitably be glared by the leader.`,
  };
  return res;
}
