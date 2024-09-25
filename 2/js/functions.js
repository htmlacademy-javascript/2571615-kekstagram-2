// Функция проверки строки на нужную длину

function isStringLengthValid(str, maxLength) {
    return str.length <= maxLength;
}


// Тестирование функции

function runTests1() {
    console.log(isStringLengthValid("Hello", 5)); // true
    console.log(isStringLengthValid("Hello, World!", 5)); // false
    console.log(isStringLengthValid("", 0)); // true
    console.log(isStringLengthValid("Test", 4)); // true
    console.log(isStringLengthValid("Test", 3)); // false
    console.log(isStringLengthValid("Example", 7)); // false
    console.log(isStringLengthValid("A very long string!", 50)); // true
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
    console.log(isPalindrome("A man a plan a canal Panama")); // true
    console.log(isPalindrome("Was it a car or a cat I saw")); // true
    console.log(isPalindrome("Hello")); // false
    console.log(isPalindrome("Madam Im Adam")); // true
    console.log(isPalindrome("No lemon no melon")); // true
    console.log(isPalindrome(" ")); // true (пустая строка считается палиндромом)
    console.log(isPalindrome("Never odd or even")); // true
    console.log(isPalindrome("Not a palindrome")); // false
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
    console.log(extractDigits("abc123def")); // 123
    console.log(extractDigits("no digits here")); // NaN
    console.log(extractDigits("2468 is a number")); // 2468
    console.log(extractDigits("45.67 and more")); // 4567
    console.log(extractDigits(890)); // 890
    console.log(extractDigits(-890)); // 890
    console.log(extractDigits("!@#$%^&*()")); // NaN
    console.log(extractDigits("Combine 1 apple, 2 bananas.")); // 12
    console.log(extractDigits("Zero is 0")); // 0
    console.log(extractDigits(-12345)); // 12345
}

runTests3();





