/**
 * Возвращает массив дней текущей недели для указанной даты
 * @param date - Дата, для которой нужно определить неделю
 * @param weekStartsOn - День начала недели (0 - воскресенье, 1 - понедельник)
 */
export function getWeekDays(date: Date = new Date(), weekStartsOn: 0 | 1 = 1): Array<{
  name: string;      // Сокращенное название дня
  date: string;      // Двузначный номер дня (01-31)
  fullDate: Date;    // Полный объект Date
  isToday: boolean;  // Флаг текущего дня
}> {
  const currentDate = new Date(date);
  const today = new Date();

  const firstDayOfWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay();

  const diff = weekStartsOn === 1
    ? dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    : -dayOfWeek;

  firstDayOfWeek.setDate(currentDate.getDate() + diff);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  return Array.from({length: 7}).map((_, i) => {
    const dayDate = new Date(firstDayOfWeek);
    dayDate.setDate(firstDayOfWeek.getDate() + i);

    const isToday = dayDate.toDateString() === today.toDateString();

    return {
      name: dayDate.toLocaleDateString(navigator.language, {weekday: 'short'}),
      date: dayDate.getDate().toString().padStart(2, '0'),
      fullDate: new Date(dayDate),
      isToday,
      dayOfWeek: dayDate.getDay(),
      month: dayDate.getMonth(),
      year: dayDate.getFullYear()
    };
  });
}

/**
 * Возвращает массив недель месяца, где каждая неделя - массив дней
 * @param date - Дата, для которой нужно получить недели месяца
 * @param weekStartsOn - День начала недели (0 - воскресенье, 1 - понедельник)
 */
export function getWeeksOfMonth(date: Date = new Date(), weekStartsOn: 0 | 1 = 1): Array<Array<{
  name: string;      // Сокращенное название дня ("Пн", "Вт" и т.д.)
  date: string;      // Номер дня с ведущим нулём ("01", "02"...)
  dayNumber: number; // Числовой номер дня (1-31)
  fullDate: Date;    // Полный объект Date
  isCurrentMonth: boolean; // Принадлежит ли день текущему месяцу
  isToday: boolean;  // Является ли текущим днём
  week: number;
  dayOfWeek: number,
  month: number,
  year: number
}>> {
  const currentDate = new Date(date);
  const today = new Date();

  // Определяем первый и последний день месяца
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Определяем первый день первой недели
  const firstDayOfWeek = new Date(firstDayOfMonth);
  const dayOfWeek = firstDayOfMonth.getDay();

  // Корректируем начало недели
  const diff = weekStartsOn === 1
    ? dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    : -dayOfWeek;

  firstDayOfWeek.setDate(firstDayOfMonth.getDate() + diff);

  // Создаем массив недель
  const weeks: Array<Array<any>> = [];
  let currentWeek: Array<any> = [];
  let currentDay = new Date(firstDayOfWeek);


  // Перебираем все дни, пока не выйдем за пределы месяца
  while (currentDay <= lastDayOfMonth || currentWeek.length % 7 !== 0) {
    const dayDate = new Date(currentDay);
    const isCurrentMonth = dayDate.getMonth() === currentDate.getMonth();
    const isToday = dayDate.toDateString() === today.toDateString();

    currentWeek.push({
      name: dayDate.toLocaleDateString('ru-RU', {weekday: 'short'}),
      date: dayDate.getDate().toString().padStart(2, '0'),
      dayNumber: dayDate.getDate(),
      fullDate: new Date(dayDate),
      isCurrentMonth,
      isToday,
      dayOfWeek: dayDate.getDay(),
      month: dayDate.getMonth(),
      isThisMonth: dayDate.getMonth() === (new Date).getMonth(),
      year: dayDate.getFullYear(),
      week: weeks.length
    });

    // Если неделя заполнена, добавляем в массив недель
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    // Переходим к следующему дню
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return weeks;
}

/**
 * Возвращает массив дней текущей недели для указанной даты
 * @param date - Дата, для которой нужно определить неделю
 * @param weekStartsOn - День начала недели (0 - воскресенье, 1 - понедельник)
 */
export function getCurrentWeek(
  date: Date = new Date(),
  weekStartsOn: 0 | 1 = 1
): Array<{
  date: Date;                // Полный объект даты
  dayNumber: number;         // Дата дня (1-31)
  dayOfWeek: number;         // День недели (0-6)
  month: number;             // Месяц (0-11)
  year: number;              // Год
  isToday: boolean;          // Флаг текущего дня
  formattedDate: string;     // Дата в формате "DD.MM.YYYY"
  weekdayName: string;       // Название дня недели ("Пн", "Вт"...)
  isIncludeInMonth: boolean  // Принадлежит ли день месяцу из date - параметра ф-ции
}> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Определяем первый день недели
  const firstDayOfWeek = new Date(date);
  const dayOfWeek = date.getDay();

  // Корректируем начало недели
  const diff = weekStartsOn === 1
    ? dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    : -dayOfWeek;

  firstDayOfWeek.setDate(date.getDate() + diff);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  // Создаем массив из 7 дней
  return Array.from({length: 7}).map((_, i) => {
    const dayDate = new Date(firstDayOfWeek);
    dayDate.setDate(firstDayOfWeek.getDate() + i);

    // Форматируем дату
    const formattedDate = [
      dayDate.getDate().toString().padStart(2, '0'),
      (dayDate.getMonth() + 1).toString().padStart(2, '0'),
      dayDate.getFullYear()
    ].join('.');

    // Проверяем, является ли день текущим
    const isToday = dayDate.toDateString() === today.toDateString();
    const isIncludeInMonth = date.getMonth() === dayDate.getMonth();

    return {
      date: dayDate,
      dayNumber: dayDate.getDate(),
      dayOfWeek: dayDate.getDay(),
      month: dayDate.getMonth(),
      year: dayDate.getFullYear(),
      isToday,
      formattedDate,
      weekdayName: dayDate.toLocaleDateString('ru-RU', {weekday: 'short'}),
      isIncludeInMonth
    };
  });
}