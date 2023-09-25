module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ["<rootDir>/src/"], // 필요하면 적절한 소스 디렉토리로 변경하세요.
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/../../$1"
      }    
  };
  