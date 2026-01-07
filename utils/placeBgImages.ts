type TplaceBgImagesInputOptions = {
  cols?: number;
  rows?: number;
  numberOfEmptyCol?: number | number[];
  defaultSizeCell?: number;
  countOfImages?: number;
  gap?: number;
};

type TplaceBgImagesInputOptionsOfItem<T = any> = {
  name: string;
  size?: number;
  addInfo?: T[];
};

export type TplaceBgImagesOut = TplaceBgImagesInputOptionsOfItem & {
  top: string;
  left: string;
  size: string;
};

type Grid = (typeof forbCell | typeof permCell)[][];

interface Position {
  row: number;
  col: number;
}

const forbCell = true;
const permCell = false;
const mesErLargerForbIndex = "Индекс запретных столбцов больше количества столбцов сетки";
const squareOfFigure = 100;

export const findAvailablePositions = (
  grid: Grid,
  sizeCell: number,
  forbiddenCols: Set<number>
): Position[] => {
  const rows = grid.length;
  const cols = grid[0].length;
  const positions: Position[] = [];

  for (let r = 0; r <= rows - sizeCell; r++) {
    for (let c = 0; c <= cols - sizeCell; c++) {
      let canPlace = true;

      // Проверяем КВАДРАТ ячеек, который займет картинка
      for (let ir = 0; ir < sizeCell; ir++) {
        for (let ic = 0; ic < sizeCell; ic++) {
          const currentRow = r + ir;
          const currentCol = c + ic;

          // Если хотя бы одна ячейка внутри квадрата занята (forbCell)
          // или колонка запрещена — эта позиция (r, c) не подходит
          if (grid[currentRow][currentCol] === forbCell) {
            canPlace = false;
            break;
          }
        }
        if (!canPlace) break;
      }

      if (canPlace) {
        positions.push({row: r, col: c});
      }
    }
  }

  return positions;
};

const placeBgImages = (
  images: TplaceBgImagesInputOptionsOfItem[],
  options?: TplaceBgImagesInputOptions
): TplaceBgImagesOut[] => {
  const cols = options?.cols || 10;
  const rows = options?.rows || 10;
  const defaultSizeCell = options?.defaultSizeCell || 1;
  const countOfImages = options?.countOfImages || images.length;

  const emptyColsParam = options?.numberOfEmptyCol;
  const forbiddenCols = new Set(
    Array.isArray(emptyColsParam)
      ? emptyColsParam
      : emptyColsParam !== undefined ? [emptyColsParam] : []
  );

  if (Array.from(forbiddenCols).some((idx) => idx >= cols)) {
    throw new Error(mesErLargerForbIndex);
  }

  // --- Шаг 1: Инициализация сетки ---

  const colEmptyChecker = (colIndex: number): typeof forbCell | typeof permCell => {
    return forbiddenCols.has(colIndex) ? forbCell : permCell;
  };

  // Создаем матрицу. Важно: внутри map по строкам создаем массив колонок, 
  // где index - это номер колонки (cIndex)
  const grid: Grid = Array(rows)
    .fill(null)
    .map(() =>
      Array(cols)
        .fill(null)
        .map((_, cIndex) => colEmptyChecker(cIndex))
    );

  // --- Подготовка списка картинок ---

  // Создаем полный список объектов, которые нужно разместить (с учетом countOfImages)
  let itemsToPlace: TplaceBgImagesInputOptionsOfItem[] = [];
  for (let i = 0; i < countOfImages; i++) {
    itemsToPlace.push({...images[i % images.length]});
  }

  // --- Шаг 2: Сортировка (Начинаем с крупных) ---

  // Сортируем по убыванию размера (size), чтобы сначала разместить большие "пятна"
  itemsToPlace.sort((a, b) => {
    const sizeA = a.size || defaultSizeCell;
    const sizeB = b.size || defaultSizeCell;
    return sizeB - sizeA;
  });

  const result: TplaceBgImagesOut[] = [];

  // --- Шаг 5: Повторение (Цикл по объектам) ---

  for (const item of itemsToPlace) {
    const currentSize = item.size || defaultSizeCell;

    // --- Шаг 3: Поиск доступных позиций ---
    const availablePositions = findAvailablePositions(grid, currentSize, forbiddenCols);

    // --- Шаг 4: Случайное размещение ---

    if (availablePositions.length > 0) {
      // Выбираем случайную точку
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const {row, col} = availablePositions[randomIndex];

      // Помечаем ячейки как занятые в сетке
      for (let r = 0; r < currentSize; r++) {
        for (let c = 0; c < currentSize; c++) {
          grid[row + r][col + c] = forbCell;
        }
      }

      // Расчет процентов для CSS
      const topPct = (row / rows) * 100;
      const leftPct = (col / cols) * 100;
      const sizeInPercent = (currentSize / cols) * 100;

      result.push({
        ...item,
        top: `${topPct.toFixed(2)}%`,
        left: `${leftPct.toFixed(2)}%`,
        size: `${sizeInPercent.toFixed(2)}%`,
      });

    } else {
      console.warn(`[placeBgImages]: Не удалось найти место для "${item.name}" размером ${currentSize}`);
      // Мы просто пропускаем объект, как указано в алгоритме, и идем к следующему
    }
  }

  return result;
};

export default placeBgImages;