export class Disk{
    name: string;
    read: number;
    write: number;
}
export class CommonMetrics{
    loadavg: number[];
    disk: Disk[];
    corenum: number;
    cpuuser: number;
    cpusys: number;
    memtotal: number;
    memfree: number;
    memavail: number;
    createAt: Date;
    updateAt: Date;
}