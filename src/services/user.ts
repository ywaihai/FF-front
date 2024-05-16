import myAxios from "../plugins/myAxios";
import { setCurrentUserState } from "../states/user";

export const getCurrentUser = async () => {
    
    const res = await myAxios.get("/user/current");
    console.log(res, "what???");
    if (res.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}