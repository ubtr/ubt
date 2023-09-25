async function delay<T>(delayMs: number, fn: (() => Promise<T>) | undefined) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(async () => {
      try {
        if (fn) {
          resolve(await fn());
        }
      } catch (e) {
        reject(e);
      }
    }, delayMs);
  });
}

type Func<T> = () => Promise<T>;
type FuncNoRet = () => void;

export class RateLimiter {
  private tickSizeMs: number;
  private countPerTick?: number;
  private tickStart: number;
  private count: number;
  private queue: FuncNoRet[] = [];
  private timeout: NodeJS.Timeout | undefined;

  constructor(tickSizeMs: number, countPerTick?: number) {
    this.tickSizeMs = tickSizeMs;
    this.countPerTick = countPerTick;
    this.count = 0;
    this.tickStart = Math.trunc(Date.now() / this.tickSizeMs) * this.tickSizeMs;
  }

  private async processQueue() {
    const now = Date.now();
    const diff = now - this.tickStart;
    if (diff > this.tickSizeMs && this.count > 0) {
      this.count = 0;
      this.tickStart = Math.trunc(now / this.tickSizeMs) * this.tickSizeMs;
    }
    const maxCount = Math.min(this.countPerTick ?? 0, this.queue.length);
    for (let i = this.count; i < maxCount; i++) {
      const elm = this.queue.shift();
      if (elm) {
        elm();
        this.count++;
      }
    }
  }

  private enqueue<T>(fn: Func<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(() => {
        try {
          fn().then(resolve).catch(reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  async limit<T>(fn: Func<T>): Promise<T> {
    if (this.countPerTick === undefined) {
      return fn();
    }
    const now = Date.now();
    const curTickStart = Math.trunc(now / this.tickSizeMs) * this.tickSizeMs;

    if (this.queue.length > 0) {
      return this.enqueue(fn);
    }

    const diff = now - this.tickStart;
    if (diff >= this.tickSizeMs) {
      this.tickStart = curTickStart;
      this.count = 0;
      return fn();
    } else if (this.count < this.countPerTick) {
      this.count++;
      return fn();
    } else {
      return this.enqueue(fn);
    }
  }

  start() {
    if (!this.timeout) {
      this.timeout = setInterval(() => this.processQueue(), this.tickSizeMs);
    }
    return this;
  }

  stop() {
    if (this.timeout) {
      clearInterval(this.timeout);
      this.timeout = undefined;
    }
  }
}

export function applyLimit(obj: any, name: string, rl: RateLimiter): void {
  const orig = obj[name];
  obj[name] = (...args: any[]) => {
    return rl.limit(() => orig.apply(obj, args));
  };
}
