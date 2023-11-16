import { ReactNode } from "react";

export enum TextAlignEnum {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

export enum TextSizeEnum {
  XL = "20px",
  LG = "16px",
  MD = "12px",
  SM = "11px",
}

export enum TextWeightEnum {
  BOLDER = 800,
  BOLD = 700,
  MEDIUM = 400,
  THIN = 300,
}

export interface ITextProps {
  children: ReactNode;

  align?: TextAlignEnum;
  size?: TextSizeEnum;
  weight?: TextWeightEnum;
}

const Text = ({ children, align, size, weight }: ITextProps) => {
  const spec = {
    textAlign: align,
    fontSize: size,
    fontWeight: weight,
    margin: 0,
  };

  return <p style={{ ...spec }}>{children}</p>;
};

export default Text;

Text.defaultProps = {
  align: TextAlignEnum.LEFT,
  size: TextSizeEnum.MD,
  weight: TextWeightEnum.MEDIUM,
};
