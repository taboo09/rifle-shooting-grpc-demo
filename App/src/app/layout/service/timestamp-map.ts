import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

export function mapDateFromTimestamp(x: Timestamp.AsObject | undefined): Date{
    if (x === undefined) return new Date(0);

    return new Date(x.seconds * 1000 + Math.round(x.nanos / 1000000));
}

export function mapDateToTimestamp(x: Date | undefined): Timestamp | undefined{

    if ((x === undefined) || (x === null)) return undefined;

    const timestamp = new Timestamp();

    // 3600 seconds added to bypass the GMT(for summer time)
    timestamp.setSeconds(x.valueOf() / 1000 + 3600);
    timestamp.setNanos((x.valueOf() % 1000) * 1e6);
        
    return timestamp;
}