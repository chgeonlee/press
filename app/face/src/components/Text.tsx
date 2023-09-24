import { ReactNode } from "react";

export enum TextAlignEnum {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

export enum TextSizeEnum {
  LG = "18px",
  MD = "12px",
  SM = "11px",
}

export enum TextWeightEnum {
  BOLD = 600,
  MEDIUM = 300,
  THIN = 100,
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
