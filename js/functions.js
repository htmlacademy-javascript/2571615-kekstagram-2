// Функция проверки строки на нужную длину

function isStringLengthValid(str, maxLength) {
  return str.length <= maxLength;
}


// Тестирование функции

function runTests1() {
  document.write('Проверка первой функции </br>');
  document.write(`${isStringLengthValid('Hello', 5)}</br>`); // true
  document.write(`${isStringLengthValid('Hello, World!', 5)}</br>`); // false
  document.write(`${isStringLengthValid('', 0)}</br>`); // true
  document.write(`${isStringLengthValid('Test', 4)}</br>`); // true
  document.write(`${isStringLengthValid('Test', 3)}</br>`); // false
  document.write(`${isStringLengthValid('Example', 7)}</br>`); // false
  document.write(`${isStringLengthValid('A very long string!', 50)}</br>`); // true
}

runTests1();

//////////////////////////////////////////////////////////////////////////

// Функция проверки на палиндром

function isPalindrome(str) {
  // Удаляем пробелы и приводим строку к нижнему регистру
  const cleanedStr = str.replace(/\s+/g, '').toLowerCase();
  // Проверяем, равна ли строка своему обратному варианту
  return cleanedStr === cleanedStr.split('').reverse().join('');
}


// Тесты

function runTests2() {
  document.write('Проверка второй функции </br>');
  document.write(`${isPalindrome('A man a plan a canal Panama')}</br>`); // true
  document.write(`${isPalindrome('Was it a car or a cat I saw')}</br>`); // true
  document.write(`${isPalindrome('Hello')}</br>`); // false
  document.write(`${isPalindrome('Madam Im Adam')}</br>`); // true
  document.write(`${isPalindrome('No lemon no melon')}</br>`); // true
  document.write(`${isPalindrome(' ')}</br>`); // true (пустая строка считается палиндромом)
  document.write(`${isPalindrome('Never odd or even')}</br>`); // true
  document.write(`${isPalindrome('Not a palindrome')}</br>`); // false
}

runTests2();

///////////////////////////////////////////////////////////////////////////////////

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

//Тесты

function runTests3() {
  document.write('Проверка третьей функции </br>');
  document.write(`${extractDigits('abc123def')}</br>`); // 123
  document.write(`${extractDigits('no digits here')}</br>`); // NaN
  document.write(`${extractDigits('2468 is a number')}</br>`); // 2468
  document.write(`${extractDigits('45.67 and more')}</br>`); // 4567
  document.write(`${extractDigits(890)}</br>`); // 890
  document.write(`${extractDigits(-890)}</br>`); // 890
  document.write(`${extractDigits('!@#$%^&*()')}</br>`); // NaN
  document.write(`${extractDigits('Combine 1 apple, 2 bananas.')}</br>`); // 12
  document.write(`${extractDigits('Zero is 0')}</br>`); // 0
  document.write(`${extractDigits(-12345)}</br>`); // 12345
}

runTests3();


