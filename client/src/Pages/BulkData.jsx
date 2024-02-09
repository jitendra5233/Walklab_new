import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const BulkDataCom = () => {
  const [BulkData, setBulkData] = useState([]);

  useEffect(() => {
    getBulkData();
  }, []);

  const getBulkData = () => {
    axios
      .get("http://localhost:5005/getBulkData")
      .then((result) => {
        const dataEntries = result.data.entries;

        if (Array.isArray(dataEntries)) {
          const newData = dataEntries.map((x, index) => {
            const dateObject = new Date(x.createdAt);

            return {
              key: x._id,
              id: index + 1,
              data: x.data,
              my_date: dateObject.toLocaleDateString(),
              my_time: dateObject.toLocaleTimeString(),
            };
          });

          setBulkData(newData);
        } else {
          console.error(
            "Entries property in data received from server is not an array:",
            dataEntries
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching bulk data:", err);
      });
  };

  const columns = [
    { title: "No", dataIndex: "id", key: "id" },
    { title: "Date", dataIndex: "my_date", key: "my_date" },
    { title: "Time", dataIndex: "my_time", key: "my_time" },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      render: (text) => (
        <textarea
          style={{ width: "1000px", height: "200px" }}
          value={text}
          readOnly
        />
      ),
    },
  ];

  const handleExcelImport = () => {
    // Create a workbook
    const wb = XLSX.utils.book_new();

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    const formattedBatchList = BulkData.map((item) => {
      const {
        id,
        key,
        my_date,
        my_time,
        createdAt,
        picture,
        updatedAt,
        ...rest
      } = item;
      return {
        ...rest,
        Date: my_date,
        Time: my_time,
      };
    });

    const ws = XLSX.utils.json_to_sheet(formattedBatchList);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate a download link for the workbook
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger a click to download the file
    const a = document.createElement("a");
    a.href = url;
    a.download = "BulkData1_Report.xlsx";
    a.click();
  };
  return (
    <div style={{ padding: "1rem " }}>
      <div style={{ paddingBottom: "2rem", textAlign: "left" }}>
        <h2>BULK DATA 1</h2>
        <span
          className="TopMenuTxt"
          style={{ float: "right", marginRight: "-60px" }}
        >
          <Button
            key="excelImport"
            type="primary"
            onClick={handleExcelImport}
            style={{ marginRight: "70px", marginTop: "-100px" }}
          >
            Export Report <DownloadOutlined />
          </Button>
        </span>
      </div>
      <Table
        dataSource={BulkData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 2 }}
      />
    </div>
  );
};

export default BulkDataCom;
