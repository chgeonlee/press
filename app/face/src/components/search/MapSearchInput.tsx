import { useRef, useState } from "react";
import Text from "../Text";
import SearchIcon from "../icon/self/search";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const MapSearchInput = () => {
  const ref = useRef();
  const inputRef = useRef<HTMLInputElement>();
  const [visibleModal, setVisibleModal] = useState(false);

  useOutsideClick(ref, () => {
    if (visibleModal == true) {
      setVisibleModal(false);
    }
  });

  return (
    <div className="input-wrapper" ref={ref}>
      <div className="icon">
        <SearchIcon />
      </div>
      <input
        ref={inputRef}
        className="input"
        placeholder="Find map"
        onChange={(e) => {
          inputRef.current.value = e.target.value;
          setVisibleModal(inputRef.current.value.length > 0);
        }}
        onFocus={() => {
          if (inputRef.current.value.length) {
            setVisibleModal(true);
          }
        }}
      />
      {visibleModal && (
        <div className="map-search-input-modal">
          <Text>검색결과가 없습니다.</Text>
        </div>
      )}
    </div>
  );
};

export default MapSearchInput;
