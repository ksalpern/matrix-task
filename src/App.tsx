import React from "react";
import Matrix from "./Matrix";
import { MatrixProvider } from "./MatrixContext";

const App: React.FC = () => {
  return (
    <MatrixProvider rows={5} cols={5}>
      <Matrix />
    </MatrixProvider>
  );
};

export default App;
