document.addEventListener('DOMContentLoaded', function () {


/////////////////////////////  Часть с изменением полей обьема //////////////////////////////////////////////////////////////////////////////////////////////////////////

const totalCapacityInput = document.getElementById('totalCapacity');
const totalWaterVolumeInput = document.getElementById('totalWaterVolume');
const totalCapacityPlaceholder = 'Celková kapacita:';
const totalWaterVolumePlaceholder = 'Celkový vodní objem:';

function hideQuestionAndDescription(inputElement, placeholderText) {
    const questionElement = inputElement.closest('.input-container').querySelector('.question');
    const descriptionElement = inputElement.closest('.input-container').querySelector('.description');

    descriptionElement.style.display = 'none'; // Скрываем описание вопроса
    inputElement.setAttribute('placeholder', placeholderText); // Устанавливаем текст placeholder
    questionElement.textContent = placeholderText;
}

function showQuestionAndDescription(inputElement, placeholderText) {
    const questionElement = inputElement.closest('.input-container').querySelector('.question');
    const descriptionElement = inputElement.closest('.input-container').querySelector('.description');
    
    questionElement.style.display = 'block'; // Показываем вопрос
    descriptionElement.style.display = 'block'; // Показываем описание вопроса
    questionElement.textContent = placeholderText;
    inputElement.removeAttribute('placeholder'); // Удаляем текст placeholder
}

totalCapacityInput.addEventListener('input', function () {
    const placeholderText = 'Celkový vodní objem bude spočítán podle zadané kapacity';

    if (this.value !== '') {
        totalWaterVolumeInput.style.visibility = 'hidden'; // Скрываем элементы ввода
        totalWaterVolumeInput.nextElementSibling.style.visibility = 'hidden'; // Скрываем единицы измерения
        totalWaterVolumeInput.value = ''; // Очищаем его значение
       hideQuestionAndDescription(totalWaterVolumeInput, placeholderText); // Скрываем вопрос и описание вопроса и устанавливаем placeholder
    } else {
        totalWaterVolumeInput.style.visibility = 'visible'; // Показываем элементы ввода
        totalWaterVolumeInput.nextElementSibling.style.visibility = 'visible'; // Показываем единицы измерения
        showQuestionAndDescription(totalWaterVolumeInput, totalWaterVolumePlaceholder); // Показываем вопрос и описание вопроса и убираем placeholder
    }
});

totalWaterVolumeInput.addEventListener('input', function () {
    const placeholderText = 'Celková kapacita bude spočítána podle zadaného objemu';

    if (this.value !== '') {
        totalCapacityInput.style.visibility = 'hidden'; // Скрываем элементы ввода
        totalCapacityInput.nextElementSibling.style.visibility = 'hidden'; // Скрываем единицы измерения
        totalCapacityInput.value = ''; // Очищаем его значение
        hideQuestionAndDescription(totalCapacityInput, placeholderText); // Скрываем вопрос и описание вопроса и устанавливаем placeholder
    } else {
        totalCapacityInput.style.visibility = 'visible'; // Показываем элементы ввода
        totalCapacityInput.nextElementSibling.style.visibility = 'visible'; // Показываем единицы измерения
        showQuestionAndDescription(totalCapacityInput, totalCapacityPlaceholder); // Показываем вопрос и описание вопроса и убираем placeholder
    }
});
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Нажатия на кнопки  ///////////////////////////////////////////////////////////////////////////////////////////////////////////  


// Получаем все кнопки для каждой группы
const buttonGroups = document.querySelectorAll('.button-group');

// Добавляем обработчик события клика для каждой группы
buttonGroups.forEach(group => {
    const optionButtons = group.querySelectorAll('.option-button');
    
    optionButtons.forEach(button => {
        // Проверяем, добавлен ли уже обработчик события клика
        if (!button.classList.contains('click-handler-added')) {
            button.classList.add('click-handler-added'); // Добавляем класс для отслеживания добавления обработчика
            button.addEventListener('click', () => {
                // Если кнопка уже выбрана, снимаем выбор
                if (button.classList.contains('selected')) {
                    button.classList.remove('selected');
                    // Устанавливаем значение в скрытом поле для текущей группы как null
                    const hiddenInput = group.closest('.input-container').querySelector('input[type="hidden"]');
                    hiddenInput.value = '';
                } else {
                    // Сбрасываем выбор для всех кнопок в текущей группе
                    optionButtons.forEach(btn => btn.classList.remove('selected'));
                    // Устанавливаем выбор для текущей кнопки
                    button.classList.add('selected');
                    
                    // Устанавливаем значение в скрытом поле для текущей группы
                    const hiddenInput = group.closest('.input-container').querySelector('input[type="hidden"]');
                    hiddenInput.value = button.getAttribute('data-value');
                    
                }
            });
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// множественный выбор  //////////////////////////////////////////////////////////////////////


// Получаем все группы кнопок, которые должны поддерживать множественный выбор
const multiSelectGroups = document.querySelectorAll('.multi-select-group');

// Добавляем обработчик события клика только для этих групп
multiSelectGroups.forEach(group => {
    const optionButtons = group.querySelectorAll('.option-button');
    
    optionButtons.forEach(button => {
        // Проверяем, добавлен ли уже обработчик события клика
        if (!button.classList.contains('click-handler-added')) {
            button.classList.add('click-handler-added'); // Добавляем класс для отслеживания добавления обработчика
            button.addEventListener('click', () => {

                const dataValue = button.getAttribute('data-value');
                console.log('выбрано', dataValue);

                // Если кнопка уже выбрана, снимаем выбор
                if (button.classList.contains('selected')) {
                    button.classList.remove('selected');
                    // Устанавливаем значение в скрытом поле для текущей группы как null
                    const hiddenInput = group.closest('.input-container').querySelector('input[type="hidden"]');
                    hiddenInput.value = '';
                } 
                else if (dataValue == "nic"){  //нажатие на кнопку nic
                        // Подсветите выбранный вариант ответа
                        console.log('нажато nic ', dataValue);
                        optionButtons.forEach(btn => {
                           btn.classList.remove('selected');
                        });
                        button.classList.add('selected');
                        }
                        else {
                            const nicButton = group.querySelector('.option-button[data-value="nic"]');
                            nicButton.classList.remove('selected');
                            console.log('нажато: ', dataValue);
                            console.log('принял что надо убрать ', nicButton);

                    // Устанавливаем выбор для текущей кнопки
                    button.classList.add('selected');
                    
                    // Устанавливаем значение в скрытом поле для текущей группы
                    const hiddenInput = group.closest('.input-container').querySelector('input[type="hidden"]');
                    hiddenInput.value = button.getAttribute('data-value');
                    


                }
            });
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////  Множественный выбор для онли    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Получаем все группы кнопок, которые должны поддерживать множественный выбор
const multiSelectGroup = document.querySelectorAll('.multi-select-group-only');

// Добавляем обработчик события клика только для этих групп
multiSelectGroup.forEach(group => {
    const optionButtons = group.querySelectorAll('.option-button');
    
    optionButtons.forEach(button => {
        // Проверяем, добавлен ли уже обработчик события клика
        if (!button.classList.contains('click-handler-added')) {
            button.classList.add('click-handler-added'); // Добавляем класс для отслеживания добавления обработчика
            button.addEventListener('click', () => {

                const dataValue = button.getAttribute('data-value');
                console.log('выбрано', dataValue);

                // Если кнопка уже выбрана, снимаем выбор
                if (button.classList.contains('selected')) {
                    button.classList.remove('selected');
                    // Устанавливаем значение в скрытом поле для текущей группы как null
                    const hiddenInput = group.closest('.input-container').querySelector('input[type="hidden"]');
                    hiddenInput.value = '';
                } 
                else if ((dataValue == "nic") || (dataValue == "only")){  //нажатие на кнопку nic
                        // Подсветите выбранный вариант ответа
                        console.log('нажато nic или pouze', dataValue);
                        optionButtons.forEach(btn => {
                           btn.classList.remove('selected');
                        });
                        button.classList.add('selected');
                        }
                        else {
                            const nicButton = group.querySelector('.option-button[data-value="nic"]');
                            nicButton.classList.remove('selected');
                            console.log('принял что надо убрать nic- ', nicButton);

                            const onlyButton = group.querySelector('.option-button[data-value="only"]');
                            onlyButton.classList.remove('selected');
                            console.log('принял что надо убрать only-', onlyButton);
                        
                    // Устанавливаем выбор для текущей кнопки
                    button.classList.add('selected');
                    
                    // Устанавливаем значение в скрытом поле для текущей группы
                    const hiddenInput = group.closest('.input-container').querySelector('input[type="hidden"]');
                    hiddenInput.value = button.getAttribute('data-value');
                    


                }
            });
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////      Всплывающее окно     //////////////////////////////////////////////////////////////////////////////////////////////


// Находим кнопку открытия попапа и попап
const openPopupButton = document.getElementById('openPopupButton');
const popup = document.getElementById('popup');

// Находим кнопку закрытия попапа
const closePopupButton = document.getElementById('closePopupButton');

// Добавляем обработчик события для открытия попапа
openPopupButton.addEventListener('click', () => {
    popup.style.display = 'block';
});

// Добавляем обработчик события для закрытия попапа
closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Добавляем обработчик события для закрытия попапа при клике вне попапа
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});





});

  
