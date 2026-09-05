import { LogLayer, StructuredTransport } from 'loglayer'
import { AsyncLocalStorage } from 'node:async_hooks';


const log = new LogLayer({
    transport: new StructuredTransport({
        logger: console
    })
})


// This is here to create an async store that'll store the logger instance for a particular request. This is useful for adding request-specific context to logs, such as a request ID or user ID.
export const requestContext = new AsyncLocalStorage<{ logger: LogLayer }>()

export function getLogger(): LogLayer {
    const store = requestContext.getStore()
    if (!store) {
        return log;
    }
    return store.logger
}

export default log;