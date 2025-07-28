import { auth } from "./app/lib/auth";

export const middleware = auth;
export const config = {
    matcher:["/account"], //一旦到这个页面就触发callback
}