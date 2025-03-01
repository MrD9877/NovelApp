import { store, toggleFromLibrary } from "@/redux/userSlice";

const addNovelToLiberary = async (novelId: string) => {
  store.dispatch(toggleFromLibrary(novelId));
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
