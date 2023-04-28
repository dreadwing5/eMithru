function isDate(value) {
  return value instanceof Date;
}

function processTableData(data) {
  return data.map((item) => {
    const processedItem = {};

    for (const key in item) {
      if (key !== "_id" && key !== "__v" && key !== "messages") {
        if (key === "participants") {
          // Join the participant names into a comma-separated list
          processedItem[key] = item[key]
            .map((participant) => participant.name)
            .join(", ");
        } else if (key === "author") {
          // Include the createdBy name
          processedItem[key] = item[key].name;
        } else if (isDate(item[key])) {
          processedItem[key] = new Date(item[key]).toLocaleDateString();
        } else {
          processedItem[key] =
            item[key] === "" || item[key] === null ? "NA" : item[key];
        }
      }
    }

    return processedItem;
  });
}

export default processTableData;
