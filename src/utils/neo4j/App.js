import React from "react";
import { ResponsiveNeoGraph } from "./NeoGraph";

const NEO4J_URI = "bolt://8.142.103.153:7687";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "huaguangjiaoyu";

const NeoGraphApp = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "green", fontSize: "20px" }}>
        知识图谱演示
      </h1>
      {/* <NeoGraph
        width={1200}
        height={800}
        containerId={"id1"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
        backgroundColor={"#ffffff"}
      /> */}
      <ResponsiveNeoGraph
        containerId={"id0"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
      />
    </div>
  );
};

export default NeoGraphApp;
