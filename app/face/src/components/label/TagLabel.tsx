import Text, { TextWeightEnum } from "../Text";

const TagLabel = ({ name, fnClick }: { name: string; fnClick: () => void }) => {
  return (
    <div className="taglabel" onClick={fnClick}>
      <div className="label">
        <Text weight={TextWeightEnum.MEDIUM}>{name}</Text>
      </div>
    </div>
  );
};

export default TagLabel;
