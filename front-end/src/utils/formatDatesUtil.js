import dayjs from 'dayjs';

export const formatDates = (data) => {
    const result = { ...data };
    for (const key in result) {
      if (result[key] instanceof Date) {
        result[key] = dayjs(result[key]).format("YYYY-MM-DD");
      }
    }
    return result;
  };