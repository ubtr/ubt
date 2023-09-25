import log from "./log";


export const LogErrors = (): any => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (!descriptor) {
      return;
    }
    // Save a reference to the original method
    const originalMethod = descriptor.value;

    // Rewrite original method with try/catch wrapper
    descriptor.value = function (...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);

        // Check if method is asynchronous
        if (result && result instanceof Promise) {
          // Return promise
          return result.catch((error: any) => {
            handleError(this, error);
          });
        }

        // Return actual result
        return result;
      } catch (error) {
        handleError(this, error);
      }
    };

    return descriptor;
  };
};

function handleError(ctx: any, error: any) {
  log.error(error)
  throw error;
}
