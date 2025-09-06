export class TimeUtils {
    static days(num: number): number {
        return num * 24 * 60 * 60 * 1000
    }

    static hours(num: number): number {
        return num * 60 * 60 * 1000
    }

    static minutes(num: number): number {
        return num * 60 * 1000
    }
}
