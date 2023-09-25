import { expect, describe, it } from "@jest/globals";
import { RateLimiter, applyLimit } from "../src/ratelimiter";
import log from "../src/log";

namespace TestNamespace {
  export function someCalc(i: number) {
    return new Promise((resolve) => {
      resolve(i);
    });
  }
}

describe("RateLimiter", () => {
  it("limit", async () => {
    const someCalc = (i: number) => {
      return new Promise((resolve) => {
        resolve(i);
      });
    };
    const rl = new RateLimiter(100, 3).start();
    const promises = [];
    const now = Date.now();
    for (let i = 0; i < 100; i++) {
      promises.push(rl.limit(() => someCalc(i)));
    }

    const res = await Promise.all(promises);
    const diff = Date.now() - now;
    rl.stop();

    expect(res).toEqual([...Array(100).keys()]);
    expect(diff).toBeGreaterThan(33 * 100);
    expect(diff).toBeLessThan(34 * 100);
  }, 100000);

  it("limitMoreThanCalls", async () => {
    const someCalc = (i: number) => {
      return new Promise((resolve) => {
        resolve(i);
      });
    };
    const rl = new RateLimiter(100, 101).start();
    const promises = [];

    for (let i = 0; i < 100; i++) {
      promises.push(rl.limit(() => someCalc(i)));
    }
    log.info(`Waiting ${promises.length}`);
    const res = await Promise.all(promises);
    rl.stop();

    expect(res).toEqual([...Array(100).keys()]);
  });

  it("noLimit", async () => {
    const someCalc = (i: number) => {
      return new Promise((resolve) => {
        resolve(i);
      });
    };
    const rl = new RateLimiter(100, 101).start();
    const promises = [];
    for (let i = 0; i < 100; i++) {
      promises.push(rl.limit(() => someCalc(i)));
    }
    log.info(`Waiting ${promises.length}`);
    const res = await Promise.all(promises);
    rl.stop();

    expect(res).toEqual([...Array(100).keys()]);
  });

  it("applyLimit_class", async () => {
    class TestClass {
      someCalc = (i: number) => {
        return new Promise((resolve) => {
          resolve(i);
        });
      };
    }

    const tc = new TestClass();
    const rl = new RateLimiter(100, 3).start();
    applyLimit(tc, "someCalc", rl);
    const promises = [];
    const now = Date.now();
    for (let i = 0; i < 100; i++) {
      promises.push(tc.someCalc(i));
    }

    const res = await Promise.all(promises);
    const diff = Date.now() - now;
    rl.stop();

    expect(res).toEqual([...Array(100).keys()]);
    expect(diff).toBeGreaterThan(33 * 100);
    expect(diff).toBeLessThan(35 * 100);
  }, 100000);

  it("applyLimit_namespace", async () => {
    const rl = new RateLimiter(100, 3).start();
    applyLimit(TestNamespace, "someCalc", rl);
    const promises = [];
    const now = Date.now();
    for (let i = 0; i < 100; i++) {
      promises.push(TestNamespace.someCalc(i));
    }

    const res = await Promise.all(promises);
    const diff = Date.now() - now;
    rl.stop();

    expect(res).toEqual([...Array(100).keys()]);
    expect(diff).toBeGreaterThan(33 * 100);
    expect(diff).toBeLessThan(35 * 100);
  }, 100000);
});
