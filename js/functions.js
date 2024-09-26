// Функция проверки строки на нужную длину

function isStringLengthValid(str, maxLength) {
  return str.length <= maxLength;
}

// Функция проверки на палиндром

function isPalindrome(str) {
  // Удаляем пробелы и приводим строку к нижнему регистру
  const cleanedStr = str.replace(/\s+/g, '').toLowerCase();
  // Проверяем, равна ли строка своему обратному варианту
  return cleanedStr === cleanedStr.split('').reverse().join('');
}

// Дополнительное задание
// Определяем функцию

function extractDigits(input) {
  // Если входное значение - это число, преобразуем его в строку
  const str = typeof input === 'number' ? input.toString() : input;

  // Извлекаем все цифры и соединяем их в строку
  const digits = str.match(/\d/g);

  // Если цифр нет, возвращаем NaN
  if (!digits) {
    return NaN;
  }

  // Преобразуем строки цифр в число
  return parseInt(digits.join(''), 10);
}