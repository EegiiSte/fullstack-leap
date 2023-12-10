import { Transfer } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HeadMUI } from "../../component";
import "./Home.css";

export const Home = () => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);
  const filterOption = (inputValue, option) =>
    option.description.indexOf(inputValue) > -1;
  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };
  const handleSearch = (dir, value) => {
    console.log("search:", dir, value);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <HeadMUI pathValue={1} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="d-flex flex-direction-c just-c">
          This is Home page
          <Transfer
            dataSource={mockData}
            showSearch
            filterOption={filterOption}
            targetKeys={targetKeys}
            onChange={handleChange}
            onSearch={handleSearch}
            render={(item) => item.title}
          />
        </div>
      </div>
    </div>
  );
};
