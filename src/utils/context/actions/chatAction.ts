import {
    GET_APPLICANT_LIST,
    GET_APPLICANT_LIST_SUCCESS,
    GET_APPLICANT_LIST_ERROR,
    GET_CHAT_LIST,
    GET_CHAT_LIST_SUCCESS,
    GET_CHAT_LIST_ERROR,
    GET_ROOM_LIST,
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_ERROR,
    GET_USER_INFO,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
    PUSH_MESSAGE,
    REFRESH_LAST_MESSAGE,
    READ_MESSAGE,
    CHANGE_STATUS,
    DELETE_APPLICANT,
    DELETE_LAST_MESSAGE,
} from "../types";

import chatApi from "../../api/chat";

import { ChatData } from "../../../components/interfaces";

export async function getApplicant(dispatch: any, club_id: number) {
    dispatch({ type: GET_APPLICANT_LIST });
    try {
        const response = await chatApi.getApplicant(club_id);
        dispatch({ type: GET_APPLICANT_LIST_SUCCESS, data: response.data });
    } catch (err) {
        dispatch({ type: GET_APPLICANT_LIST_ERROR, error: err });
    }
}

export async function getChatList(dispatch: any, chat_id: number) {
    dispatch({ type: GET_CHAT_LIST });
    try {
        const response = await chatApi.getChatList(chat_id);
        dispatch({
            type: GET_CHAT_LIST_SUCCESS,
            data: { chattings: response.data.reverse(), chat_id },
        });
    } catch (err) {
        dispatch({ type: GET_CHAT_LIST_ERROR, error: err });
    }
}

export async function getRoomList(dispatch: any, club_id: number) {
    dispatch({ type: GET_ROOM_LIST });
    try {
        let response = await chatApi.getUserList(club_id);
        response.data.rooms = response.data.rooms.filter(
            (value: any) => value.lastmessage !== null
        );
        dispatch({ type: GET_ROOM_LIST_SUCCESS, data: response.data });
    } catch (err) {
        dispatch({ type: GET_ROOM_LIST_ERROR, error: err });
    }
}

export async function getUserInfo(dispatch: any, room_id: number) {
    dispatch({ type: GET_USER_INFO });
    try {
        const response = await chatApi.getRoomInfo(room_id);
        dispatch({
            type: GET_USER_INFO_SUCCESS,
            data: { user_info: response.data, chat_id: room_id },
        });
    } catch (err) {
        dispatch({ type: GET_USER_INFO_ERROR, error: err });
    }
}

export function pushMessage(dispatch: any, message: ChatData, room_id: number) {
    dispatch({ type: PUSH_MESSAGE, data: { message, room_id } });
}

interface messageType {
    message: string;
    date: Date;
}

export function refreshLastMessage(
    dispatch: any,
    message: messageType,
    room_id: number,
    refresh?: any
) {
    dispatch({
        type: REFRESH_LAST_MESSAGE,
        data: { message, room_id, refresh },
    });
}

export function readMessage(dispatch: any, room_id: number) {
    dispatch({ type: READ_MESSAGE, data: room_id });
}

interface statusType {
    room_id: number;
    status: string;
}

export function changeStatus(dispatch: any, data: statusType) {
    dispatch({ type: CHANGE_STATUS, data });
}

export function deleteApplicant(dispatch: any, data: number) {
    dispatch({
        type: DELETE_APPLICANT,
        data: {
            id: data,
        },
    });
}

export function deleteLastMessage(dispatch: any, data: number) {
    dispatch({
        type: DELETE_LAST_MESSAGE,
        data: {
            room_id: data,
        },
    });
}
