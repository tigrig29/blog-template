type Config = {
  count: number;
  page: number;
  siblingCount: number;
  boundaryCount: number;
};

export const getCells = ({
  count,
  page,
  siblingCount,
  boundaryCount,
}: Config) => {
  const additionalCount = siblingCount + boundaryCount + 1;
  const collisionLeft = 1 + additionalCount + 1 >= page;
  const collisionRight = count - (additionalCount + 1) <= page;
  const collisionBoth = collisionLeft && collisionRight;

  if (collisionBoth) {
    return range(1, count);
  } else if (collisionLeft) {
    return [
      ...range(1, additionalCount + siblingCount + 2),
      '...',
      ...range(count - boundaryCount, count),
    ];
  } else if (collisionRight) {
    return [
      ...range(1, 1 + boundaryCount),
      '...',
      ...range(count - (siblingCount + additionalCount + 1), count),
    ];
  } else {
    return [
      ...range(1, 1 + boundaryCount),
      '...',
      ...range(page - siblingCount, page + siblingCount),
      '...',
      ...range(count - boundaryCount, count),
    ];
  }
};

const range = (left: number, right: number) =>
  Array.from({ length: right - left + 1 }).map((_, idx) =>
    (left + idx).toString(),
  );
