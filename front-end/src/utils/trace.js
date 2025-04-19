import { v4 as uuidv4 } from 'uuid';

export const getTraceId = () => {
    return localStorage.getItem("traceId");
};

export const setTraceId = (traceId) => {
    localStorage.setItem("traceId", traceId);
};

export const removeTraceId = () => {
    localStorage.removeItem("traceId");
};

export const generateTraceId = () => {
    const traceId = uuidv4();
    setTraceId(traceId);
    console.log(`Generated traceId: ${traceId}`);
    return traceId;
};