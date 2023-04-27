import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

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
        } else if (key === "createdBy") {
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

function customizeHeaderStyle(ws) {
  const headerStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "FFC000" } }, // Background color: You can change the RGB value to your desired color
    alignment: { horizontal: "center" },
  };

  // Assuming the header is in the first row
  const headerRange = XLSX.utils.decode_range(ws["!ref"]);

  let descriptionColumnIndex = null;

  for (
    let colIndex = headerRange.s.c;
    colIndex <= headerRange.e.c;
    colIndex++
  ) {
    const cellAddress = XLSX.utils.encode_cell({
      r: headerRange.s.r,
      c: colIndex,
    });

    // Find the index of the description column
    if (ws[cellAddress].v === "description") {
      descriptionColumnIndex = colIndex;
    }

    ws[cellAddress].s = headerStyle;
  }

  // Set the width of the description column
  if (descriptionColumnIndex !== null) {
    if (!ws["!cols"]) ws["!cols"] = [];
    ws["!cols"][descriptionColumnIndex] = { width: 50 }; // Adjust the width as desired
  }
}

// Helper function to convert a binary string to an ArrayBuffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

export default function exportToExcel(tableData, fileName = "exported_data") {
  // Create a new Workbook
  const wb = XLSX.utils.book_new();

  const processedData = processTableData(tableData);
  const ws = XLSX.utils.json_to_sheet(processedData);
  customizeHeaderStyle(ws);

  const timestamp = new Date().toISOString();

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Write the workbook to a binary string
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  // Convert the binary string to a Blob
  const data = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

  // Save the file using the FileSaver library
  saveAs(data, `${timestamp}-counseling-report.xlsx`);
}
