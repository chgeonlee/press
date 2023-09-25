
interface IMasonryProps {
    children: any;
    rowGap: number;
    columns: number;
    columnGap: number;
}

const Masonry = ({ children, columns, rowGap, columnGap }:IMasonryProps ) => {
    
    const getColumnItems = (columnIndex: number) => (
        children
            .filter((_, index) => index % columns === columnIndex)
            .map((child, index) => (
                <div key={index} style={{ marginBottom: rowGap + 'px' }}>
                    {child}
                </div>
            ))
    );

    return (
        <div>
            {Array.from({ length: columns }).map((_, columnIndex) => {
                const isLastColumn = columnIndex === columns - 1;

                return (
                    <div
                        key={columnIndex}
                        style={{
                            display: 'inline-block',
                            verticalAlign: 'top',
                            width: `calc(${100 / columns}% - ${isLastColumn ? 0 : columnGap}px)`,
                            paddingRight: isLastColumn ? '0px' : columnGap + 'px'
                        }}
                    >
                        {getColumnItems(columnIndex)}
                    </div>
                );
            })}
        </div>
    );
};

Masonry.defaultProps = {
    columns: 3,
    rowGap : 8,
    columnGap: 8
}

export default Masonry;

