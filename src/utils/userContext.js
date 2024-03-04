import { createContext } from "react";

const userContext = createContext({
    user: {
        userName:null,
        userId: null,
        email: null,
        roleId: null,
    }
})

userContext.displayName = "UserContext";

export default userContext;