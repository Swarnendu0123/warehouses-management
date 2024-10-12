import { atom } from 'recoil';

export const userState = atom(
    {
        key: "userState",
        default: ""
    }
)


export const currentFileState = atom(
    {
        key: "currentFileState",
        default: null
    }
)

