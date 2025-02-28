const addNovelToLiberary = async (novelId: string) => {
  try {
    const response = await fetch(`/api/addToLibrary`, { method: "POST", body: JSON.stringify({ novelId }) });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
export default addNovelToLiberary;
