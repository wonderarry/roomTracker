import { StatusCode } from "./statusCode"

export interface RoomData {
    room: string,
    specialist: string,
    service: string,
    status: StatusCode
}

export interface Rooms {
    rooms: RoomData[]
}