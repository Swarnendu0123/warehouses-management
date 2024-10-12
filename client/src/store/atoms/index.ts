import { atom } from 'recoil';

export const newQuestionsState = atom({
    key: 'newQuestionsState',
    default: [],
});

export const questionState = atom(
    {
        key: "questionState",
        default: ""
    }
)

export const userState = atom(
    {
        key: "userState",
        default: ""
    }
)

export const ToastState = atom(
    {
        key: "ToastState",
        default: {
            title: "",
            message: "",
        }
    }
)

export const ToastToggleState = atom(
    {
        key: "ToastToggleState",
        default: false
    }
)