module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return date.toLocaleDateString();
    },
    format_timedate: (date) => {
        return date.toLocaleDateString() + ' at ' + date.toLocaleDateString();
    }
  };
  