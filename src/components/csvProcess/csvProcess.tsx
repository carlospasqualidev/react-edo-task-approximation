import CSVReader from "react-csv-reader";

interface IProcessedData {
  task: string;
  estimate: number;
  actual: number;
  adjustedPoints: number;
}

function transform(csv: string[][]) {
  const processedData: IProcessedData[] = [];

  for (let index = 1; index < csv.length; index++) {
    if (!csv[0] || csv[index][0] === "") continue;

    const estimate = csv[index][9] ? Number(csv[index][9]) * 3 : 0;
    const actual = csv[index][10]
      ? Number(csv[index][10].replace(",", "."))
      : 0;

    const adjustedPoints = estimate > 0 ? estimate * (actual / estimate) : 0;

    processedData.push({
      task: csv[index][0],
      estimate: estimate,
      actual: actual,
      adjustedPoints: Math.ceil(adjustedPoints),
    });
  }
  return processedData;
}

export function CSVProcess() {
  return (
    <CSVReader
      onFileLoaded={(data) => transform(data)}
      inputStyle={{
        color: "red",
        width: "100%",
        height: "100%",
        fontSize: "1.5rem",
        textAlign: "center",
        padding: "1rem",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    />
  );
}
