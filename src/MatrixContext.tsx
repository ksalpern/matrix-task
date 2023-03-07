import React, { createContext, useContext } from "react";

type MatrixContextType = {
  rows: number;
  cols: number;
};

const MatrixContext = createContext<MatrixContextType>({
  rows: 0,
  cols: 0
});

export const useMatrixContext = () => useContext(MatrixContext);

type MatrixProviderProps = {
  children: React.ReactNode;
  rows: number;
  cols: number;
};

export const MatrixProvider: React.FC<MatrixProviderProps> = ({
  children,
  rows,
  cols
}) => {
  return (
    <MatrixContext.Provider value={{ rows, cols }}>
      {children}
    </MatrixContext.Provider>
  );
};
