import Queue from 'bee-queue';

export class PartnerQueue {
    private queue: Queue;
    private redisSettings: object;
    private timeout: number;

    constructor(name: string, redisHost?: string, redisPort?: number, timeout?: number) {
        this.queue = new Queue(name, {
            prefix: name,
            redis: {
                host: host || '127.0.0.1',
                port: port || 6379,
                db: 0,
                options: {},
            },
            removeOnSuccess: true,
        });

        // default timeout of 3000 ms
        this.timeout = timeout || 3000;
    }

    start(worker: function): void {
        if (!this.queue.isRunning()) {
            this.queue.process(function (job, done) {
                worker(job, function (error, response) {
                    done(error, response);
                });
            });
        }
    }

    stop(): void {
        this.queue.close(2000);
    }

    push(paramaters: object, callback?: function): void {
        const request = this.queue.createJob(paramaters);

        // Save request with max of 2 retries
        request.timeout(this.timeout).retries(2).save();

        // register callback is defined
        if (callback && typeof callback == 'function') {
            request.on('succeeded', callback);
        }
    }

    get(id: number, callback: function): void {
        this.queue.getJob(id, callback);
    }

    registerEventListener(event: string, listener: function): void {
        this.queue.on(event, listener);
    }
}
